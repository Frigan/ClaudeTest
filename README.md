# Royal Rumble Simulator

A narrative Royal Rumble simulator with a Node.js/Express backend and vanilla JS frontend.

## Setup

```bash
npm install
npm start
```

Then open **http://localhost:3000** in your browser.

## How to Play

1. Add wrestlers using the form — give each a name and a **Fighting Style**
2. Styles follow a Rock-Paper-Scissors advantage loop (shown in the UI)
3. Click **Start the Royal Rumble** once you have at least 2 wrestlers
4. Watch the commentary unfold — entrants arrive every ~10 seconds, up to 6 in the ring at once
5. Results (placements, nicknames, elimination history) are saved automatically for future rematches — returning wrestlers get name-dropped in commentary

## Architecture

```
server.js          Express backend — GET/POST /api/wrestlers, serves /public
wrestlers.json     Persistent data store (auto-created on first run)
public/
  index.html       UI structure — setup screen + rumble screen + ticker
  style.css        Dark WWE/AEW broadcast aesthetic
  app.js           Simulation engine, narrative engine, API client
```

### Key mechanics

| Feature | Detail |
|---------|--------|
| Style advantage | Powerhouse ➤ Brawler ➤ High-Flyer ➤ Technical ➤ Powerhouse (65/35 odds) |
| Ring cap | Max 6 wrestlers at once; new entrant every ~10 s |
| Elimination build-up | 3–5 commentary lines before each elimination (2–3 s apart) |
| Interference | 5% chance per elimination sequence — eliminated or historical wrestlers run in |
| Nicknames | 12% chance assigned on first entry; persisted in JSON |
| Memory | Returning wrestlers' placement, eliminator and method referenced in commentary |
