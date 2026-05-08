# tela

`tela` is a self-contained frontend prototype for a clothing recommendation app inspired by Spotify DJ.

## What it does

- Tracks clothing items with image upload, name, color, type, brand, dirty status, and recently worn status
- Generates outfit suggestions from the combinations you wear most often
- Creates a visual outfit inspo board from styles like gorpcore or soft tailoring
- Simulates a random daily fit-check prompt and lets users post tagged outfit photos to an explore feed
- Persists everything in `localStorage`, so your closet and posts stay in the browser

## Run it

Open [/Users/elvisamaya/Documents/clothes/index.html](/Users/elvisamaya/Documents/clothes/index.html) directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 4173
```

Then visit [http://localhost:4173](http://localhost:4173).

## Notes

- The inspo image generator is implemented as an offline visual renderer, so it works without API keys.
- The structure is ready to swap to a real image generation or backend recommendation service later.
