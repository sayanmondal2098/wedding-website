const SHEET_ID = '1MlOaoicoJ5gbNoJVkqceJCy3wQ6Z8y3YQRn4FD1qIdE';
const SHEET_NAME = 'RSVP Responses';

function doPost(event) {
  const data = event.parameter || {};
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(5000);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'),
      data.name || '',
      data.attending || '',
      data.dietary || '',
      'Wedding website',
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
