const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'wrestlers.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeDB(data) {
  const tmp = DB_PATH + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tmp, DB_PATH);
}

app.get('/api/wrestlers', async (req, res) => {
  try {
    res.json(await readDB());
  } catch (err) {
    console.error('GET /api/wrestlers:', err.message);
    res.status(500).json({ error: 'Failed to read wrestler data' });
  }
});

app.post('/api/wrestlers', async (req, res) => {
  try {
    const updates = req.body;
    if (!Array.isArray(updates)) {
      return res.status(400).json({ error: 'Expected an array of wrestler updates' });
    }

    const data = await readDB();

    for (const update of updates) {
      const { elimsThisRumble, ...clean } = update;
      const idx = data.findIndex(
        w => w.name.toLowerCase() === clean.name.toLowerCase()
      );

      if (idx >= 0) {
        const s = data[idx].stats || { rumbles: 0, wins: 0, eliminations: 0, timesEliminated: 0 };
        const newStats = {
          rumbles:         s.rumbles + 1,
          wins:            s.wins + (clean.lastRumble.placement === 1 ? 1 : 0),
          eliminations:    s.eliminations + (elimsThisRumble || 0),
          timesEliminated: s.timesEliminated + (clean.lastRumble.eliminatedBy ? 1 : 0),
        };
        data[idx] = { ...data[idx], ...clean, stats: newStats };
      } else {
        data.push({
          ...clean,
          stats: {
            rumbles:         1,
            wins:            clean.lastRumble.placement === 1 ? 1 : 0,
            eliminations:    elimsThisRumble || 0,
            timesEliminated: clean.lastRumble.eliminatedBy ? 1 : 0,
          },
        });
      }
    }

    await writeDB(data);
    res.json({ success: true, total: data.length });
  } catch (err) {
    console.error('POST /api/wrestlers:', err.message);
    res.status(500).json({ error: 'Failed to save wrestler data' });
  }
});

app.listen(PORT, () => {
  console.log(`🤼  Royal Rumble Server → http://localhost:${PORT}`);
});
