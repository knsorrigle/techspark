/**
 * TechSpark Audition Registration 2026 → Google Sheet
 *
 * Setup (5 minutes):
 * 1. Create a Google Sheet (e.g. "TechSpark Auditions 2026").
 * 2. Extensions → Apps Script. Delete what's there, paste this whole file, Save.
 * 3. Deploy → New deployment → type "Web app".
 *      Execute as: Me      Who has access: Anyone
 *    Click Deploy, allow access, copy the Web app URL (ends in /exec).
 * 4. In index.html, find CONFIG and paste it:  SHEET_URL: 'https://script.google.com/macros/s/.../exec'
 * 5. Redeploy the site. New registrations appear as rows in the "Registrations" tab.
 *
 * Pass IDs are issued in order (TS-2026-0001, 0002, …). If the same USN registers twice,
 * no new row is added and the student gets their existing pass back.
 */
const SHEET_NAME = 'Registrations';
const COLS = ['Timestamp', 'Pass ID', 'Full name', 'USN', 'Year', 'Semester', 'Department', 'Phone', 'Email', 'Interests', 'Skills'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(COLS);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, COLS.length).setFontWeight('bold');
    }
    const p = e.parameter || {};
    if (p['bot-field']) return json({ ok: false, error: 'spam' });

    const usn = String(p.usn || '').toUpperCase().trim();
    if (!usn || !p.full_name) return json({ ok: false, error: 'missing fields' });

    const last = sh.getLastRow();
    if (last > 1) {
      const rows = sh.getRange(2, 2, last - 1, 3).getValues(); // Pass ID, Name, USN
      for (const r of rows) {
        if (String(r[2]).toUpperCase() === usn) return json({ ok: true, duplicate: true, pass_id: r[0] });
      }
    }

    const passId = 'TS-2026-' + String(last).padStart(4, '0');
    sh.appendRow([
      new Date(), passId, p.full_name, usn, p.year, p.semester, p.department,
      "'" + (p.phone || ''), p.email, p.interests, p.skills
    ]);
    return json({ ok: true, pass_id: passId });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json({ ok: true, service: 'TechSpark audition registration' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
