# Connect RSVPs to the Sheet

The RSVP form is ready to send entries to the Google Sheet. One account-owner deployment is required because Google protects write access to Sheets.

1. Open [Apps Script](https://script.google.com/home/projects/create) while signed into the Google account that owns the RSVP Sheet.
2. Replace the default `Code.gs` with `google-apps-script/Code.gs`, then replace `appsscript.json` with `google-apps-script/appsscript.json`.
3. Select **Deploy → New deployment → Web app**. Run as **Me** and set access to **Anyone** so wedding guests can submit. Authorize the project and copy the resulting `/exec` URL.
4. For local development, create `.env.local` from `.env.example` and replace the placeholder with that URL.
5. The deployed endpoint is already set in `.env.production`, so GitHub Pages picks it up automatically during `npm run build`.

Your Sheet: https://docs.google.com/spreadsheets/d/1MlOaoicoJ5gbNoJVkqceJCy3wQ6Z8y3YQRn4FD1qIdE/edit
