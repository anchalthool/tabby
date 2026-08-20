# CartSplit

Mobile-first bill/check splitting app.

## Features

- Upload or photograph a receipt / order screenshot
- Gemini multimodal receipt extraction
- Editable item names, quantities, and prices
- Per-person quantity assignment with + / - controls
- Shared items split equally among selected friends
- Tax, delivery, service fees, and tip split equally across all participants
- Remember recent friend names in the browser
- Push exact owed shares to Splitwise
- Responsive crayon/grocery-inspired UI

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add:

```env
GEMINI_API_KEY=your_key_here
SPLITWISE_ACCESS_TOKEN=your_token_here
```

The app still has a **Try demo** button if Gemini is not configured.

## Splitwise behavior

CartSplit fetches the authenticated Splitwise user and friend list, then matches the names entered in the app against Splitwise first/full names. For best results, enter the same names used in Splitwise.

The payer gets the full `paid_share`; each participant receives their calculated `owed_share`.

## Deploy

The project is ready for Vercel. Add the same environment variables to the Vercel project before production deployment.
