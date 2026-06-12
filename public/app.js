/* ================================================================
   ROYAL RUMBLE SIMULATOR — app.js
   ================================================================ */

// ── Style advantage loop ───────────────────────────────────────
const STYLE_BEATS = {
  Powerhouse:   'Brawler',
  Brawler:      'High-Flyer',
  'High-Flyer': 'Technical',
  Technical:    'Powerhouse',
};

const STYLE_COLOR = {
  Powerhouse:   '#e63946',
  Brawler:      '#f4a261',
  'High-Flyer': '#2ec4b6',
  Technical:    '#74b9ff',
};

// ── Distinct wrestler colours (avoid red/gold/orange/neon-green/purple/cyan emphasis) ──
const WRESTLER_COLORS = [
  '#FF6EB4', // hot pink
  '#00CED1', // dark turquoise
  '#7B68EE', // medium slate blue
  '#00FA9A', // medium spring green
  '#FF7F50', // coral
  '#DA70D6', // orchid
  '#87CEEB', // sky blue
  '#DEB887', // burlywood
  '#F08080', // light coral
  '#40E0D0', // turquoise
  '#9370DB', // medium purple
  '#20B2AA', // light sea green
  '#FA8072', // salmon
  '#B0E0E6', // powder blue
  '#FFB6C1', // light pink
  '#98FB98', // pale green
  '#DDA0DD', // plum
  '#66CDAA', // medium aquamarine
  '#F5DEB3', // wheat
  '#82B1FF', // blue accent
];

// ── Nickname pool ──────────────────────────────────────────────
const NICKNAMES = [
  'The Bone Crusher',
  'The Architect of Chaos',
  'The Human Wrecking Ball',
  'The Nightmare',
  'The Juggernaut',
  'The Phenom',
  'The Beast Incarnate',
  'The Last Outlaw',
  'Walking Catastrophe',
  'The Embodiment of Violence',
  'Lord of Carnage',
  'The Final Boss',
  'The Certified Menace',
  'The Human Liability',
  'Dr. Devastation',
  'Professor Pain',
  'The Nightmare Made Flesh',
  'Patient Zero',
  'The Chaos Engine',
  'The Physical Manifestation of Problems',
  'The Violence Specialist',
  'Absolute Unit',
  'The Walking Warning Label',
  'The Main Event Disaster',
  'The Bringer of Woe',
  'The Rampaging Id',
  'The Human Event Horizon',
  'The Unstoppable Catastrophe',
  'The Calamity Express',
  'The Unchecked Menace',
  'The Doomsday Device',
  'The Human Stress Test',
];

// ── Commentary arrays ──────────────────────────────────────────

const CATCHPHRASES = [
  'BAH GAWD!',
  'AS GOD AS MY WITNESS, THAT MAN HAS A FAMILY!',
  'BUSINESS IS ABOUT TO PICK UP!',
  'SOMEBODY STOP THE DAMN MATCH!',
  'WILL YOU STOP?!',
  "IT'S A SLOBBERKNOCKER!",
  "HE'S BEEN BROKEN IN HALF!",
  'Unbelievable sequence! I have never seen anything like that in my life!',
  'Somewhere Jack Tunney is smiling!',
  'THIS IS AWESOME! THIS IS AWESOME!',
  'The roof is about to come off this place!',
  "I've seen a lot of things in my career but NOTHING like this!",
  'What a maneuver!',
  'The crowd is absolutely ELECTRIC tonight!',
  "Can you IMAGINE the scenes right now?!",
  'This is why we LOVE professional wrestling!',
  "Somebody's momma is crying tonight!",
  'THIS IS LEGAL?! HOW IS ANY OF THIS LEGAL?!',
  'The physics of this match are COMPLETELY INCOMPREHENSIBLE!',
  'THEY HAVE GONE ABSOLUTELY NUCLEAR IN THERE!',
  "I cannot in good conscience continue watching this — I lied, I absolutely can and WILL!",
  'This is THEATRE! This is SPECTACLE! This is WRESTLING!',
  'Ring the bell! No — DON\'T ring it! Actually — RING IT!',
  'My producer is telling me to calm down and I am respectfully REFUSING!',
  'We are making HISTORY tonight, folks. Write it down!',
  "If you blinked just now, I am deeply sorry for your loss!",
  'The adrenaline in this building right now could power a SMALL COUNTRY!',
  'I need a minute. I genuinely need A MINUTE after that!',
  'The greatest show on earth is happening RIGHT NOW!',
  "I've been doing this for thirty years and I have NEVER seen anything like this!",
  'The inmates have completely taken over this asylum and I could not be more thrilled!',
  'ORGANIZED CHAOS! This is beautiful, glorious ORGANIZED CHAOS!',
  'We are witnessing ARTISTRY of the highest order tonight!',
  'I am LOSING MY MIND right now and I have never been happier about it!',
  "This crowd didn't come here expecting THIS level of excellence and here we are!",
];

const ACTION_TEMPLATES = [
  '{A} drives {D} back into the turnbuckle with THUNDEROUS right hands!',
  '{A} measures {D} — and CONNECTS with a massive running clothesline!',
  '{D} reverses! A desperate counter that keeps them alive!',
  '{A} goes for the elimination — {D} HANGS ON with everything they have!',
  '{D} is fighting with the heart of a CHAMPION right now!',
  '{A} is absolutely relentless tonight, folks!',
  'The crowd goes BERSERK as {A} and {D} trade vicious blows!',
  '{A} with a THUNDEROUS shot — {D} staggers — nearly goes over!',
  '{D} ducks! {A} nearly eliminates THEMSELVES! This crowd LOVES it!',
  '{D} SOMEHOW survives! How?! For the love of God, HOW?!',
  '{A} going old school — methodically grinding {D} down!',
  'WHAT A SEQUENCE from {A} and {D}! The crowd cannot believe it!',
  '{A} with a signature maneuver — the ring SHAKES from the impact!',
  '{D} is showing incredible resilience and heart right now!',
  'This crowd is SPLIT DOWN THE MIDDLE between {A} and {D}!',
  '{A} HAS {D} over the top — NO! {D} skins the cat back in!',
  'A MASSIVE spine-on-pine from {A} drives {D} into the corner!',
  '{D} is rocked! They are wobbling! Can they possibly survive?!',
  '{A} smells blood — they are going in for the absolute KILL!',
  "The chemistry between {A} and {D} is absolutely ELECTRIC tonight!",
  '{A} with a running charge — {D} side-steps! BRILLIANT ring awareness!',
  'BACK AND FORTH — {A}! No — {D}! No — {A} again! This crowd is on its FEET!',
  '{A} attempting to muscle {D} over — {D} WILL NOT give up the ropes!',
  'Shades of greatness from {A} as they target the legs of {D}!',
  '{A} grabs {D} by the collar and LAUNCHES them across the ring!',
  '{A} going for {D}\'s legs — a tactical shift that has completely changed this match!',
  '{D} is using the ropes like a life preserver right now!',
  '{A} plants {D} with a DEVASTATING impact move — the entire ring shakes!',
  '{D} is hanging on by sheer force of WILL alone!',
  '{A} ROARS at the crowd after that sequence — pure, unadulterated intensity!',
  '{D} dodges {A}\'s charge and uses their own momentum against them — BRILLIANT!',
  '{A} with a VICIOUS headlock, methodically grinding {D} down to the mat!',
  '{D} fires back! Right hand! Another! {A} is ROCKED!',
  '{A} trying to use the ropes for leverage — absolutely ruthless tactics!',
  '{D} collapses into the corner — {A} senses the kill!',
  'THUNDEROUS exchange of blows from both {A} and {D}! Neither will give an inch!',
  '{A} charges — {D} sidesteps — {A} CRASHES into the turnbuckle! The crowd GASPS!',
  '{D} and {A} both prone on the mat — who digs DEEPER tonight?',
  '{A} has zeroed in on {D} like a guided MISSILE of pure destruction!',
  '{D} trying desperately to recover but {A} is NOT letting them breathe!',
  '{A} with a massive SLAM that echoes off the very walls of this arena!',
  '{D} grabs the top rope with BOTH hands — {A} cannot shift them!',
  '{A} attempts a high-risk manoeuvre — {D} moves — CRITICAL ERROR from {A}!',
  '{D} counters OUT OF NOWHERE — absolutely stunning ring awareness!',
  '{A} methodically stalking {D} around the ring — this is psychological WARFARE!',
  '{D} spits in {A}\'s face! {A} looks APOPLECTIC with rage right now!',
  '{A} with a running lariat — {D} ducks — almost takes out the referee!',
  '{A} WRAPS {D} up in the ropes — the referee is powerless to stop this!',
  '{D} is draped over the ropes — {A} seizes the moment with vicious stomps!',
  '{A} locks eyes with {D} from across the ring — the temperature drops ten degrees!',
  '{D} rolls away just in time — instincts saving them from the worst!',
  '{A} with a LEAPING attack that nearly sends both of them flying!',
  'The crowd chants for {D} — it only seems to FUEL {A} further!',
  '{A} looking for a big slam — {D} escapes! The crowd exhales in RELIEF!',
  '{D} has lasted longer than ANYONE expected — {A} cannot believe it!',
];

const NEAR_ELIM_TEMPLATES = [
  '{A} has {D} teetering on the apron — ONE FOOT NEARLY ON THE FLOOR!',
  '{D} is hanging by their FINGERNAILS over the apron! Both feet dangling!',
  '{A} DUMPS {D} — but they catch the top rope with one hand! UNBELIEVABLE!',
  'THIS IS IT FOR {D}… NO! They drag themselves back in! The crowd ERUPTS!',
  '{D} on the apron — {A} charges — {D} SKINS THE CAT! STILL ALIVE!',
  'OH MY GOD — {D} just hung on by one hand from the top rope! INCREDIBLE!',
  '{A} gets {D} up and OVER — {D} lands on the apron with both feet dangling!',
  '{D} rolls under {A}\'s legs — right to the ropes — dangling on the outside!',
  '{A} has {D} in a bear hug and WALKS them toward the ropes — {D} sprawls out!',
  'The crowd HOLDS ITS BREATH as {D} teeters on the very edge of elimination!',
  '{A} LAUNCHES {D} — somehow they land on the apron and CLING to the ropes!',
  'IT LOOKED OVER FOR {D}! They grabbed {A}\'s tights on the way down — back in!',
  '{A} goes for the big one — {D} lands on the apron, RUNS IT, and rolls back in!',
  'BOTH {A} AND {D} on the apron right now — ONE WRONG MOVE ends this whole thing!',
  '{A} has {D} on the second rope — {D} is hanging over the abyss on pure instinct!',
  '{D} almost touches the floor — one toe! Just one toe would end it! They pull back!',
  '{A} with a massive lift — {D} goes SIDEWAYS over the top — catches the rope with a HEEL!',
  '{D} is essentially on the floor — but both feet just barely on the apron still! STILL IN!',
];

const ELIM_TEMPLATES = [
  '{A} LAUNCHES {D} over the top rope and DOWN TO THE FLOOR! ELIMINATED!',
  'OVER THE TOP ROPE — DOWN TO THE FLOOR! {D} has been eliminated by {A}!',
  '{A} with the MASSIVE elimination — {D} is GONE from this Rumble!',
  "{A} DUMPS {D} TO THE OUTSIDE! See ya — wouldn't wanna be ya!",
  'OH! {D} never saw it coming! Eliminated by {A}! OUT OF HERE!',
  '{D} is OUTTA HERE! {A} with the HUGE elimination! What a moment!',
  '{A} FINALLY does it — {D} hits the floor! ELIMINATED! The crowd EXPLODES!',
  '{A} with a vicious clothesline from HELL — {D} rotates in mid-air and CRASHES to the floor!',
  '{A} grabs {D} by BOTH LEGS and launches them into low orbit — ELIMINATED!',
  '{D} finally runs out of escapes! {A} does the job and it is DONE! ELIMINATED!',
  'The crowd ERUPTS as {A} sends {D} crashing to the floor! It is OVER for {D}!',
  '{D} tried EVERYTHING — but {A} was just too much tonight! ELIMINATED!',
  '{A} with BRUTE FORCE — {D} didn\'t even see the final move coming! GONE!',
  'In the BLINK OF AN EYE — {D} is on the outside floor! Eliminated by {A}!',
  'A ROLL OF THE DICE and {A} comes up GOLD — {D} ELIMINATED!',
  'Good night to {D}! Sent to the floor courtesy of {A}! OUT!',
  '{A} sidesteps the charge and uses {D}\'s OWN MOMENTUM — eliminated in SPECTACULAR fashion!',
  '{D} takes one step too many toward {A} — and pays the ULTIMATE price! ELIMINATED!',
];

const ENTRANCE_TEMPLATES = [
  'The crowd ERUPTS as {W} makes their way to the ring!',
  'HERE COMES {W}! The place is absolutely ELECTRIC right now!',
  '{W} storms down the aisle, eyes focused, ready for total WAR!',
  'LISTEN TO THAT REACTION as {W} slides under the bottom rope!',
  'Number {N} is here — it is {W} — and they look READY!',
  '{W} is HERE and I would NOT want to be standing in that ring right now!',
  '{W} came here tonight to WIN THE GAME and everyone in that ring knows it!',
  'Oh no. OH NO. {W} has arrived and this changes EVERYTHING!',
  'Nobody in that ring is happy to see {W} right now. NOBODY. AT. ALL.',
  '{W} marches to that ring like they already OWN the entire building!',
  'The temperature in this arena just dropped ten degrees — {W} has arrived!',
  '{W} is staring at everyone in that ring like they are all PROBLEMS to be SOLVED!',
  'I have been waiting all night for {W} to get out here. IT IS TIME!',
  '{W} does not come here to participate — they come here to CONQUER!',
  'The locker room sent their best — and {W} has answered the call PERSONALLY!',
  'Every single person in that ring just made eye contact with {W} and then looked away!',
  '{W} is in this match now and the ENTIRE complexion just changed!',
  'I would NOT want to be the next person {W} sets their eyes on right now!',
  '{W} hits the ring like a freight train with UNFINISHED BUSINESS!',
  '{W} sliding into that ring with the look of someone who has absolutely NOTHING to lose!',
];

const WIN_TEMPLATES = [
  'WE HAVE A WINNER! {W} HAS WON THE ROYAL RUMBLE!',
  '{W} IS THE LAST ONE STANDING! THEY HAVE WON THE ROYAL RUMBLE!',
  'OH MY GOD! {W} HAS DONE IT! THE ROYAL RUMBLE IS OVER!',
  'LISTEN TO THIS CROWD! {W} IS YOUR ROYAL RUMBLE WINNER!',
  'UNBELIEVABLE! {W} HAS SURVIVED THE ENTIRE FIELD AND WON!',
  '{W} falls to their knees — it has SUNK IN — they have WON the Royal Rumble!',
  'From the opening bell to the final elimination — {W} has outlasted EVERYONE! YOUR WINNER!',
  'The last superstar standing — {W} has claimed the Royal Rumble in INCREDIBLE fashion!',
  'THE PLACE IS GOING ABSOLUTELY NUCLEAR — {W} HAS WON THE ROYAL RUMBLE!',
  '{W} — against every odd stacked against them — is your Royal Rumble winner!',
  'THEY SAID IT COULDN\'T BE DONE! {W} JUST PROVED EVERY SINGLE PERSON WRONG!',
];

const INTERFERENCE_TEMPLATES = [
  "WAIT A MINUTE! IS THAT {I}?! They're coming through the crowd!",
  "OH MY GOD! {I} is CHARGING down the ramp — THIS IS ABSOLUTE CHAOS!",
  "NOBODY EXPECTED THIS! {I} has just cost {V} EVERYTHING!",
  "What in the world?! {I} has stormed the ring — the referee has LOST ALL CONTROL!",
  "PANDEMONIUM! {I} just appeared from absolutely NOWHERE — {V} never had a chance!",
  "{I} was supposed to be at home watching on TV! What are they DOING here?!",
  "Did {I} just emerge from the CROWD?! This is complete and utter PANDEMONIUM!",
  "The locker room is EMPTYING! {I} is out here and NOBODY can stop them!",
  "UNINVITED and UNSTOPPABLE — {I} just changed the entire trajectory of this match!",
];

const ELIMINATION_METHODS = [
  'massive clothesline over the top rope',
  'back body drop to the floor',
  'running charge over the apron',
  'brutal overhead suplex over the ropes',
  'desperation throw over the ropes',
  'relentless assault that sent them flying',
  'perfectly-timed elimination move',
  'stunning reversal and a shove to the floor',
  'wheelbarrow slam over the ropes',
  'shock superkick that sent them sailing over',
  'ring apron powerbomb',
  'sneak elimination at the most crucial moment',
  'assisted elimination off the top turnbuckle',
  'vertical suplex deposited cleanly over the top rope',
  'running knee to the small of the back over the ropes',
  'hurricanrana to the floor in breathtaking fashion',
  'desperation headbutt that sent both flying — only one survived',
  'a single devastating uppercut at the ropes',
];

const THIRD_WHEEL_LINES = [
  '{C} lurks in the corner, waiting for the perfect moment to strike…',
  '{C} is stalking both competitors — biding their time like a true ring general!',
  'Do NOT forget {C} is still in this match — watching every single move!',
  '{C} circles the ring like a shark, letting the others do the damage!',
  '{C} is absolutely LICKING THEIR CHOPS watching this unfold!',
  'The smart money says {C} lets these two completely exhaust each other first!',
  '{C} is prowling like an apex predator — waiting for the PERFECT moment!',
  'Every second {C} stays back is a second they are conserving precious energy!',
  '{C} is playing chess while everyone else is playing checkers right now!',
  '{C} watching from the corner with the expression of someone who has already WON!',
];

// ================================================================
// STATE
// ================================================================

let allWrestlers       = [];
let rumbleRoster       = [];
let inRing             = [];
let eliminated         = [];
let entryQueue         = [];
let entryIndex         = 0;
let rumbleRunning      = false;
let entrantTimer       = null;
let finalTwoAnnounced  = false;
let colorIndex         = 0;

// ================================================================
// UTILITIES
// ================================================================

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ordinal(n) {
  const s = ['th','st','nd','rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Fill template, vars values are treated as raw HTML
function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

// Wrestler name as a coloured HTML span
function colorName(w) {
  if (!w) return 'Unknown';
  const color = w.color || '#f0f0f0';
  const name  = escapeHTML(w.name);
  const nick  = w.nickname ? ` &ldquo;${escapeHTML(w.nickname)}&rdquo;` : '';
  return `<span style="color:${color};font-weight:700">${name}${nick}</span>`;
}

function hasAdvantage(a, d) { return STYLE_BEATS[a.style] === d.style; }

function elimOdds(a, d) {
  if (hasAdvantage(a, d)) return 0.65;
  if (hasAdvantage(d, a)) return 0.35;
  return 0.50;
}

// ================================================================
// API  (fetch → localStorage fallback for static hosting)
// ================================================================

const LS_KEY = 'royalRumbleWrestlers';

async function fetchWrestlers() {
  try {
    const res = await fetch('/api/wrestlers');
    if (!res.ok) throw new Error('no server');
    return res.json();
  } catch {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
  }
}

async function saveResults(updates) {
  // Try the Express backend first; fall back to localStorage
  let usedServer = false;
  try {
    const res = await fetch('/api/wrestlers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) usedServer = true;
  } catch { /* no server */ }

  if (!usedServer) {
    try {
      const existing = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      for (const update of updates) {
        const idx = existing.findIndex(
          w => w.name.toLowerCase() === update.name.toLowerCase()
        );
        idx >= 0 ? (existing[idx] = { ...existing[idx], ...update }) : existing.push(update);
      }
      localStorage.setItem(LS_KEY, JSON.stringify(existing));
    } catch (e) { console.error('localStorage save failed:', e); }
  }
}

// ================================================================
// UI HELPERS
// ================================================================

function addComment(html, cls = '') {
  const box = document.getElementById('commentary-content');
  const p   = document.createElement('p');
  p.className = 'commentary-line' + (cls ? ' ' + cls : '');
  p.innerHTML = html;
  box.appendChild(p);
  box.scrollTop = box.scrollHeight;
}

function addDivider() {
  const box = document.getElementById('commentary-content');
  const hr  = document.createElement('hr');
  hr.className = 'commentary-divider';
  box.appendChild(hr);
}

function updateInRingDisplay() {
  const el    = document.getElementById('in-ring-list');
  const count = document.getElementById('ring-count');
  count.textContent = inRing.length;
  el.innerHTML = inRing.map(w => `
    <div class="ring-wrestler" style="border-left-color:${w.color || STYLE_COLOR[w.style]}">
      <span class="wrestler-name" style="color:${w.color || '#f0f0f0'}">${escapeHTML(w.name)}</span>
      <span class="wrestler-style" style="color:${STYLE_COLOR[w.style]}">${escapeHTML(w.style)}</span>
    </div>
  `).join('');
}

function updateNextEntrantsDisplay() {
  const el       = document.getElementById('next-list');
  const upcoming = entryQueue.slice(entryIndex, entryIndex + 3);
  if (upcoming.length === 0) {
    el.innerHTML = '<div class="no-next">No more entrants</div>';
    return;
  }
  el.innerHTML = upcoming.map((w, i) => `
    <div class="next-wrestler ${i === 0 ? 'next-up' : ''}">
      ${i === 0 ? '▶ ' : `${i + 1}. `}<span style="color:${w.color || '#f0f0f0'}">${escapeHTML(w.name)}</span>
      <span style="color:${STYLE_COLOR[w.style]};font-size:0.7rem"> [${escapeHTML(w.style)}]</span>
    </div>
  `).join('');
}

function updateStatsDisplay() {
  const remaining = rumbleRoster.length - eliminated.length;
  document.getElementById('remaining-count').textContent = remaining;
  document.getElementById('eliminated-stat').textContent = `${eliminated.length} eliminated`;
}

function addToTicker(victimWrestler, eliminatorName) {
  const content = document.getElementById('ticker-content');
  const span    = document.createElement('span');
  span.className = 'ticker-item';
  const c = victimWrestler.color || '#f0f0f0';
  span.innerHTML = `<span style="color:${c}">${escapeHTML(victimWrestler.name)}</span> [by: ${escapeHTML(eliminatorName)}]`;
  content.appendChild(span);
  const track = document.querySelector('.ticker-track');
  track.scrollLeft = track.scrollWidth;
}

function updateRosterDisplay() {
  const list  = document.getElementById('roster-list');
  const count = document.getElementById('roster-count');
  count.textContent = rumbleRoster.length;
  list.innerHTML = rumbleRoster.map(w => {
    const hist    = w.lastRumble;
    const histTxt = hist ? `Last: ${ordinal(hist.placement)} place` : 'Debut';
    return `
      <div class="roster-item" data-style="${escapeHTML(w.style)}">
        <span class="roster-name">${escapeHTML(w.name)}${w.nickname
          ? ` <em>&ldquo;${escapeHTML(w.nickname)}&rdquo;</em>` : ''}</span>
        <span class="roster-style" style="color:${STYLE_COLOR[w.style]}">${escapeHTML(w.style)}</span>
        <span class="roster-hist">${histTxt}</span>
      </div>
    `;
  }).join('');
  document.getElementById('start-btn').disabled = rumbleRoster.length < 2;
}

function showReturnButton() {
  document.getElementById('return-bar').hidden = false;
}

// ================================================================
// NARRATIVE ENGINE
// ================================================================

async function historyCommentary(w) {
  if (!w.lastRumble) return;
  const h = w.lastRumble;
  await sleep(1000);
  let line;
  if (h.placement === 1) {
    line = `${colorName(w)} WON the last Royal Rumble — can they make it back-to-back?!`;
  } else if (h.eliminatedBy) {
    line = `${colorName(w)} finished ${ordinal(h.placement)} last time, eliminated by <strong>${escapeHTML(h.eliminatedBy)}</strong> with a ${escapeHTML(h.method)}! Does revenge factor in tonight?!`;
  } else {
    line = `${colorName(w)} finished ${ordinal(h.placement)} last time — they will want to go one better tonight!`;
  }
  addComment(line, 'history-line');
}

async function entranceCommentary(w, entrantNumber) {
  const line = fill(pick(ENTRANCE_TEMPLATES), { W: colorName(w), N: entrantNumber });
  addComment(line, 'entrance-line');
  await historyCommentary(w);
  if (Math.random() < 0.25) {
    await sleep(900);
    addComment(pick(CATCHPHRASES), 'catchphrase-line');
  }
}

function actionLine(attacker, defender) {
  addComment(fill(pick(ACTION_TEMPLATES), { A: colorName(attacker), D: colorName(defender) }));
}

async function eliminationSequence(attacker, defender) {
  const numLines = 3 + Math.floor(Math.random() * 3); // 3–5 lines of build-up

  for (let i = 0; i < numLines; i++) {
    await sleep(2000 + Math.random() * 1200);
    if (!rumbleRunning) return;
    if (!inRing.find(w => w.name === attacker.name) ||
        !inRing.find(w => w.name === defender.name)) return;

    if (i === numLines - 1) {
      // Final build-up line: near-elimination
      addComment(
        fill(pick(NEAR_ELIM_TEMPLATES), { A: colorName(attacker), D: colorName(defender) }),
        'near-elim-line'
      );
    } else {
      actionLine(attacker, defender);

      // Occasionally name-drop a third wrestler
      if (inRing.length >= 3 && Math.random() < 0.20) {
        const third = inRing.find(w => w.name !== attacker.name && w.name !== defender.name);
        if (third) addComment(fill(pick(THIRD_WHEEL_LINES), { C: colorName(third) }), 'catchphrase-line');
      }

      if (Math.random() < 0.15) {
        addComment(pick(CATCHPHRASES), 'catchphrase-line');
      }
    }
  }

  await sleep(1800);
  if (!rumbleRunning) return;
  if (!inRing.find(w => w.name === attacker.name) ||
      !inRing.find(w => w.name === defender.name)) return;

  // ── 5% interference ───────────────────────────────────────────
  if (Math.random() < 0.05) {
    const interloper = pickInterferer(attacker, defender);
    if (interloper) {
      await runInterference(interloper, defender, attacker);
      return;
    }
  }

  // ── Resolve via style odds ────────────────────────────────────
  const attackerWins = Math.random() < elimOdds(attacker, defender);
  let winner, loser;

  if (attackerWins) {
    winner = attacker; loser = defender;
  } else {
    addComment(
      `${colorName(defender)} REVERSES! ${colorName(attacker)} is now in GRAVE DANGER!`,
      'reversal-line'
    );
    await sleep(1600);
    winner = defender; loser = attacker;
  }

  if (!inRing.find(w => w.name === winner.name) ||
      !inRing.find(w => w.name === loser.name)) return;

  addComment(
    fill(pick(ELIM_TEMPLATES), { A: colorName(winner), D: colorName(loser) }),
    'elimination-line'
  );
  await sleep(1200);
  doElimination(loser, winner, pick(ELIMINATION_METHODS));
}

async function runInterference(interferer, victim, otherWrestler) {
  addComment(
    fill(pick(INTERFERENCE_TEMPLATES), { I: colorName(interferer), V: colorName(victim) }),
    'interference-line'
  );
  await sleep(2000);
  addComment(
    `${colorName(interferer)} WITH THE SNEAK ATTACK — ${colorName(victim)} GOES OVER THE TOP ROPE! ELIMINATED!`,
    'elimination-line'
  );
  await sleep(1200);

  const creditName = interferer.name + ' (interference)';
  doElimination(victim, { name: creditName }, pick(ELIMINATION_METHODS));
  addComment(
    `The referee can do NOTHING — outside interference is perfectly legal in a Royal Rumble! ${colorName(otherWrestler)} is absolutely FURIOUS!`
  );
}

function pickInterferer(attacker, defender) {
  const candidates = [];
  for (const e of eliminated) {
    if (e.wrestler.name !== attacker.name && e.wrestler.name !== defender.name) {
      candidates.push(e.wrestler);
    }
  }
  for (const w of allWrestlers) {
    const inThisRumble = rumbleRoster.some(r => r.name.toLowerCase() === w.name.toLowerCase());
    if (!inThisRumble && w.name !== attacker.name && w.name !== defender.name) {
      candidates.push({ ...w, color: '#f0f0f0' });
    }
  }
  return candidates.length > 0 ? pick(candidates) : null;
}

// ================================================================
// SIMULATION CORE
// ================================================================

function doElimination(victim, eliminator, method) {
  const idx = inRing.findIndex(w => w.name === victim.name);
  if (idx === -1) return;
  inRing.splice(idx, 1);

  const placement = rumbleRoster.length - eliminated.length;
  eliminated.push({ wrestler: victim, eliminatedBy: eliminator.name, method, placement });

  addToTicker(victim, eliminator.name);
  updateInRingDisplay();
  updateStatsDisplay();

  // Bring in a waiting entrant after a short pause
  if (entryIndex < entryQueue.length) {
    setTimeout(() => {
      if (rumbleRunning && inRing.length < 6 && entryIndex < entryQueue.length) {
        enterWrestler();
      }
    }, 3500);
  }
}

async function enterWrestler() {
  if (entryIndex >= entryQueue.length) return;
  if (inRing.length >= 6) return;

  const wrestler = entryQueue[entryIndex];
  entryIndex++;
  inRing.push(wrestler);

  updateInRingDisplay();
  updateNextEntrantsDisplay();
  updateStatsDisplay();

  await entranceCommentary(wrestler, entryIndex);
}

async function actionLoop() {
  let ticksSinceElim = 0;

  while (rumbleRunning) {
    await sleep(2200 + Math.random() * 1600);
    if (!rumbleRunning) break;

    // Win condition
    if (inRing.length === 1 && entryIndex >= entryQueue.length) {
      await endRumble();
      break;
    }
    if (inRing.length === 0) break;
    if (inRing.length < 2) continue;

    // Final-two announcement
    if (inRing.length === 2 && entryIndex >= entryQueue.length && !finalTwoAnnounced) {
      finalTwoAnnounced = true;
      addDivider();
      addComment('WE ARE DOWN TO THE FINAL TWO COMPETITORS! IT ALL COMES DOWN TO THIS!', 'special-line');
      addDivider();
      await sleep(2000);
    }

    ticksSinceElim++;
    const shuffled  = shuffle(inRing);
    const attacker  = shuffled[0];
    const defender  = shuffled[1];

    const ringFull  = inRing.length >= 6 && entryIndex < entryQueue.length;
    const thresh    = inRing.length >= 5 ? 3 : (inRing.length >= 4 ? 4 : 6);
    const goForElim = ringFull || ticksSinceElim >= thresh || Math.random() < 0.28;

    if (goForElim) {
      ticksSinceElim = 0;
      await eliminationSequence(attacker, defender);
    } else {
      actionLine(attacker, defender);
      if (Math.random() < 0.12) addComment(pick(CATCHPHRASES), 'catchphrase-line');
    }
  }
}

function startEntrantTimer() {
  // No initial call — first two are handled directly in startRumble()
  entrantTimer = setInterval(() => {
    if (!rumbleRunning) { clearInterval(entrantTimer); return; }
    if (entryIndex < entryQueue.length && inRing.length < 6) {
      enterWrestler();
    }
    if (entryIndex >= entryQueue.length) clearInterval(entrantTimer);
  }, 10000);
}

async function endRumble() {
  rumbleRunning = false;
  clearInterval(entrantTimer);

  const winner = inRing[0];
  if (!winner) return;

  await sleep(800);
  addDivider();
  addComment(fill(pick(WIN_TEMPLATES), { W: colorName(winner) }), 'win-line');
  await sleep(1800);
  addComment(
    `${colorName(winner)} raises their arms in absolute TRIUMPH! An incredible performance — one for the ages!`,
    'win-line'
  );

  eliminated.push({ wrestler: winner, eliminatedBy: null, method: null, placement: 1 });

  const results = [...eliminated].map(e => ({
    name:       e.wrestler.name,
    style:      e.wrestler.style,
    nickname:   e.wrestler.nickname || null,
    lastRumble: {
      placement:    e.placement,
      eliminatedBy: e.eliminatedBy
        ? e.eliminatedBy.replace(' (interference)', '')
        : null,
      method: e.method || null,
    },
  }));

  await saveResults(results);
  await sleep(500);
  addComment('Results saved to the historical record. See you at the NEXT Royal Rumble!', 'system-line');
  showReturnButton();
}

// ================================================================
// SETUP FLOW
// ================================================================

async function addWrestlerToRoster() {
  const nameEl = document.getElementById('name-input');
  const styleEl = document.getElementById('style-select');
  const name  = nameEl.value.trim();
  const style = styleEl.value;

  if (!name || !style) { nameEl.focus(); return; }

  if (rumbleRoster.some(w => w.name.toLowerCase() === name.toLowerCase())) {
    alert(`${name} is already on the roster!`);
    return;
  }

  const historical = allWrestlers.find(w => w.name.toLowerCase() === name.toLowerCase());

  rumbleRoster.push({
    name,
    style,
    nickname:   historical?.nickname   || null,
    lastRumble: historical?.lastRumble || null,
    color:      null, // assigned at rumble start
  });

  updateRosterDisplay();
  nameEl.value  = '';
  styleEl.value = '';
  nameEl.focus();
}

async function startRumble() {
  // Assign nicknames (12% chance for new wrestlers)
  for (const w of rumbleRoster) {
    if (!w.nickname && Math.random() < 0.12) {
      w.nickname = pick(NICKNAMES);
    }
  }

  // Assign distinct colours
  colorIndex = 0;
  for (const w of rumbleRoster) {
    w.color = WRESTLER_COLORS[colorIndex % WRESTLER_COLORS.length];
    colorIndex++;
  }

  entryQueue          = shuffle(rumbleRoster);
  entryIndex          = 0;
  inRing              = [];
  eliminated          = [];
  finalTwoAnnounced   = false;

  // Switch screens
  document.getElementById('setup-screen').hidden  = true;
  document.getElementById('rumble-screen').hidden = false;
  document.getElementById('ticker-bar').hidden    = false;
  document.getElementById('return-bar').hidden    = true;
  document.getElementById('commentary-content').innerHTML = '';
  document.getElementById('ticker-content').innerHTML     = '';

  updateNextEntrantsDisplay();
  updateStatsDisplay();

  // Pre-show
  addComment('LADIES AND GENTLEMEN — WELCOME TO THE ROYAL RUMBLE!', 'opening-line');
  await sleep(1400);
  addComment(
    `${rumbleRoster.length} SUPERSTARS will enter this ring tonight — but only ONE will survive!`,
    'opening-line'
  );

  const veterans = rumbleRoster.filter(w => w.lastRumble);
  if (veterans.length > 0) {
    await sleep(1400);
    addComment(
      `Returning veterans in tonight\'s field: ${veterans.map(v => colorName(v)).join(', ')}!`,
      'history-line'
    );
  }

  await sleep(1600);
  addDivider();
  addComment("THE OPENING BELL RINGS!", 'opening-line');
  await sleep(1000);

  // ── Enter FIRST TWO simultaneously ────────────────────────────
  const w1 = entryQueue[entryIndex++];
  const w2 = entryQueue[entryIndex++];
  inRing.push(w1, w2);
  updateInRingDisplay();
  updateNextEntrantsDisplay();
  updateStatsDisplay();

  addComment(
    `${colorName(w1)} and ${colorName(w2)} are your opening two competitors — and they are IMMEDIATELY going at it!`,
    'entrance-line'
  );

  await historyCommentary(w1);
  await historyCommentary(w2);
  await sleep(800);
  addDivider();

  // Start timer for remaining entrants and action
  rumbleRunning = true;
  startEntrantTimer();
  actionLoop();
}

function returnToHome() {
  rumbleRunning = false;
  clearInterval(entrantTimer);

  // Reset runtime state (keep roster so they can re-run)
  inRing    = [];
  eliminated = [];
  entryQueue = [];
  entryIndex = 0;
  finalTwoAnnounced = false;

  document.getElementById('rumble-screen').hidden = true;
  document.getElementById('ticker-bar').hidden    = true;
  document.getElementById('setup-screen').hidden  = false;

  // Clear displays for a clean re-run
  document.getElementById('commentary-content').innerHTML = '';
  document.getElementById('ticker-content').innerHTML     = '';
}

// ================================================================
// INIT
// ================================================================

document.addEventListener('DOMContentLoaded', async () => {
  try {
    allWrestlers = await fetchWrestlers();
  } catch {
    allWrestlers = [];
  }

  document.getElementById('add-btn').addEventListener('click', addWrestlerToRoster);
  document.getElementById('name-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addWrestlerToRoster();
  });
  document.getElementById('start-btn').addEventListener('click', startRumble);
  document.getElementById('return-btn').addEventListener('click', returnToHome);
});
