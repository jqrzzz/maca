/**
 * Sample data for the Curiosity Program preview (/preview). Entirely fake and
 * presentational, in the spirit of content/previewDemo.ts. It encodes the model
 * from docs/curiosity-program.md so the demo can show the three things that
 * matter: the two-layer privacy posture (celebratory Tier 0 vs private Tier 2),
 * the incentive model (we reward sustained engagement, never headcount), and the
 * spark-fund follow-through loop (notice an interest, propose help, a human
 * approves).
 *
 * Nothing here is real. No real person, full name, photo, or location appears.
 * "Explorer names" are playful nicknames a child might pick, never identities.
 */

export type AgeBand = "child" | "teen" | "adult";
export type ConsentStatus = "given" | "pending" | "withdrawn";
export type AvatarTone = "clay" | "forest" | "gold";

const ageLabel: Record<AgeBand, string> = {
  child: "Child",
  teen: "Teen",
  adult: "Adult",
};
export const ageBandLabel = (b: AgeBand) => ageLabel[b];

/**
 * The celebratory layer: the minimum, consent-cleared, dignity-first view. This
 * is all the village steward ever sees. It holds no full identity.
 */
export type Learner = {
  id: string;
  /** A nickname or first name only, never a full identity in this layer. */
  explorerName: string;
  ageBand: AgeBand;
  consent: ConsentStatus;
  /** The welcome gift: a printed, framed photo, kept only if the family agrees. */
  photoConsent: boolean;
  joined: string;
  /** What we actually reward: distinct weeks active this month, out of four. */
  weeksActive: number;
  /** Total sessions, a depth signal, never a target to maximize. */
  sessions: number;
  lastActive: string;
  /** What lights them up, surfaced openly and with the family's knowledge. */
  spark?: string;
  /** Kid-facing milestones, recognition rather than cash. */
  stickers: string[];
  tone: AvatarTone;
};

export const learners: Learner[] = [
  {
    id: "L-01",
    explorerName: "Little Fern",
    ageBand: "child",
    consent: "given",
    photoConsent: true,
    joined: "Jun 2",
    weeksActive: 3,
    sessions: 7,
    lastActive: "today",
    spark: "Plants and growing things",
    stickers: ["Plant Explorer", "Curious Question", "Came back 3 weeks"],
    tone: "forest",
  },
  {
    id: "L-02",
    explorerName: "Sunbird",
    ageBand: "child",
    consent: "given",
    photoConsent: true,
    joined: "Jun 4",
    weeksActive: 4,
    sessions: 11,
    lastActive: "yesterday",
    spark: "Birds and flying",
    stickers: ["Sky Watcher", "Animal Friend", "Came back 4 weeks"],
    tone: "gold",
  },
  {
    id: "L-03",
    explorerName: "Mango",
    ageBand: "teen",
    consent: "given",
    photoConsent: false,
    joined: "Jun 6",
    weeksActive: 2,
    sessions: 4,
    lastActive: "2 days ago",
    spark: "Drawing and stories",
    stickers: ["Storyteller"],
    tone: "clay",
  },
  {
    id: "L-05",
    explorerName: "Sky",
    ageBand: "adult",
    consent: "given",
    photoConsent: true,
    joined: "Jun 8",
    weeksActive: 3,
    sessions: 6,
    lastActive: "today",
    spark: "Phones and how things work",
    stickers: ["Curious Question"],
    tone: "clay",
  },
  {
    id: "L-04",
    explorerName: "River",
    ageBand: "child",
    consent: "pending",
    photoConsent: false,
    joined: "Jun 17",
    weeksActive: 0,
    sessions: 0,
    lastActive: "not yet",
    stickers: [],
    tone: "forest",
  },
  {
    id: "L-06",
    explorerName: "Pebble",
    ageBand: "child",
    consent: "withdrawn",
    photoConsent: false,
    joined: "Jun 1",
    weeksActive: 1,
    sessions: 2,
    lastActive: "Jun 10",
    stickers: [],
    tone: "gold",
  },
];

/**
 * The private layer: Tier 2. In the real system this is encrypted, admin-only,
 * access-logged, and never sent to a general-purpose model. Here it is fake and
 * shown masked, only to demonstrate the posture: the steward cannot see it, the
 * founder can, and looking is logged. Keyed by learner id. Only consented,
 * active learners have one.
 */
export type LearnerPrivate = {
  fullNameMasked: string;
  household: string;
  statusNote: string;
  note: string;
};

export const learnerPrivate: Record<string, LearnerPrivate> = {
  "L-01": {
    fullNameMasked: "F•••• ••••••",
    household: "Family of 6, three children",
    statusNote: "Undocumented, no birth record",
    note: "An older sibling helps translate at sessions.",
  },
  "L-02": {
    fullNameMasked: "S••• •••••",
    household: "Family of 4, two children",
    statusNote: "Undocumented, no birth record",
    note: "Lives nearest the charging point; often first to arrive.",
  },
  "L-03": {
    fullNameMasked: "M•••• ••••",
    household: "Lives with grandmother",
    statusNote: "Undocumented",
    note: "Photo consent not given yet; respect that in any sharing.",
  },
  "L-05": {
    fullNameMasked: "S•• ••••••",
    household: "Parent of two young learners",
    statusNote: "Undocumented",
    note: "Keen to help other adults try it.",
  },
};

/* ---- The spark-fund loop: notice an interest, propose help, a human approves ---- */

export type SparkStatus = "noticed" | "proposed" | "approved" | "delivered";

export type Spark = {
  id: string;
  learnerId: string;
  interest: string;
  idea: string;
  /** Illustrative materials cost, USD. Demo only. */
  cost: number;
  status: SparkStatus;
  note: string;
};

export const sparks: Spark[] = [
  {
    id: "S-01",
    learnerId: "L-01",
    interest: "Plants and growing things",
    idea: "A simple botany starter kit: seeds, two pots, a hand lens, and a picture book in their language",
    cost: 16,
    status: "proposed",
    note: "Surfaced over three sessions. She keeps asking how plants drink.",
  },
  {
    id: "S-02",
    learnerId: "L-02",
    interest: "Birds and flying",
    idea: "A beginner bird-spotting card and a small field notebook",
    cost: 9,
    status: "approved",
    note: "Approved by the founder, to bring on the next visit.",
  },
  {
    id: "S-03",
    learnerId: "L-03",
    interest: "Drawing and stories",
    idea: "A sketchbook and a set of good pencils",
    cost: 12,
    status: "delivered",
    note: "Delivered last visit. Now fills a page most days.",
  },
  {
    id: "S-04",
    learnerId: "L-05",
    interest: "Phones and how things work",
    idea: "A safe teardown kit and a plain-language basics booklet",
    cost: 18,
    status: "noticed",
    note: "Mentioned twice. Worth watching before we propose anything.",
  },
];

export const sparkStatusLabel: Record<SparkStatus, string> = {
  noticed: "Noticed",
  proposed: "Proposed",
  approved: "Approved",
  delivered: "Delivered",
};

/* ---- How the steward (Ong) is supported: a role, not a bounty ---- */

export type CompLine = { label: string; detail: string; amount: string };

export const stewardComp: {
  intro: string;
  lines: CompLine[];
  note: string;
} = {
  intro:
    "How the steward is supported. This is a role, paid like a community learning worker, never a payment per child.",
  lines: [
    {
      label: "Monthly stipend",
      detail:
        "For the role itself. It does not move with how many children sign up.",
      amount: "set with Ong",
    },
    {
      label: "Costs reimbursed",
      detail: "Device charging, power, data, and local travel.",
      amount: "as spent",
    },
    {
      label: "Quality recognition",
      detail:
        "A small thank-you tied to learners who keep coming back, never to sign-up counts.",
      amount: "occasional",
    },
    {
      label: "No per-profile pay",
      detail: "We never pay per child, per signup, or per photo.",
      amount: "none",
    },
  ],
  note: "The absence of a per-head bounty is the point: it keeps the focus on children who are genuinely learning, not on filling a database.",
};

/* ---- Kid mode: a small, safe, canned AI for the learner demo ---- */

export const kidStarters: string[] = [
  "How do plants drink water?",
  "Why is the sky blue?",
  "Tell me about elephants",
  "What are stars made of?",
  "How does music work?",
  "Why do we dream?",
];

export type KidReply = {
  keywords: string[];
  reply: string;
  sticker?: string;
  spark?: string;
};

export const kidReplies: KidReply[] = [
  {
    keywords: [
      "plant",
      "plants",
      "grow",
      "seed",
      "flower",
      "tree",
      "leaf",
      "botany",
      "garden",
    ],
    reply:
      "Plants are amazing! They drink water through their roots, deep in the soil, then carry it all the way up to the leaves. In sunlight the leaves make their own food, and they breathe out the oxygen we need. What is your favorite plant where you live?",
    sticker: "Plant Explorer",
    spark: "Plants and growing things",
  },
  {
    keywords: ["sky", "blue", "cloud", "rain", "rainbow"],
    reply:
      "Good question! Sunlight is made of many colors mixed together. The air scatters the blue light all around, so it reaches your eyes from every direction and the sky looks blue. At sunset the light travels farther and you see reds and oranges. What does your sky look like right now?",
    sticker: "Sky Watcher",
  },
  {
    keywords: ["elephant", "animal", "tiger", "dog", "cat", "fish", "buffalo"],
    reply:
      "Animals are wonderful to wonder about! Elephants, for example, are very smart and gentle, they remember their friends for years and talk to each other with rumbles too low for us to hear. Which animal would you most like to learn about?",
    sticker: "Animal Friend",
  },
  {
    keywords: ["bird", "fly", "wing", "feather"],
    reply:
      "Birds are built to fly! Their bones are light, almost hollow, and their wings push the air down so the air pushes them up. Some birds fly for days without stopping. Have you watched a bird take off? What did you notice first?",
    sticker: "Sky Watcher",
    spark: "Birds and flying",
  },
  {
    keywords: ["star", "moon", "space", "planet", "sun", "night"],
    reply:
      "Stars are giant balls of glowing gas, so far away that their light travels for years before it reaches your eyes. Our Sun is a star too, just very close. When you look up at night, some of that light began its journey long before you were born. What do you wonder about space?",
    sticker: "Star Gazer",
  },
  {
    keywords: ["water", "river", "swim", "ocean", "puddle"],
    reply:
      "Water is amazing! The same water can be a liquid you drink, hard cold ice, or steam that floats away as a cloud. Rivers carry it down from the hills all the way to the sea, then it rises into the sky and falls again as rain. Where does the water near you come from?",
    sticker: "Water Watcher",
  },
  {
    keywords: ["number", "numbers", "count", "counting", "math", "add", "plus"],
    reply:
      "You are doing math just by wondering! Numbers are a way to count and compare everything around you. Here is a puzzle: if you pick five mangoes and give two to a friend, how many do you have left? Take your time.",
    sticker: "Number Friend",
  },
  {
    keywords: ["music", "song", "sing", "drum", "dance", "sound"],
    reply:
      "Music is sound with a pattern. When you hum, the air wiggles fast or slow, and your ears turn those wiggles into a tune. Tap a steady beat on your knee, that is rhythm, the heartbeat of a song. What do you like to sing?",
    sticker: "Music Maker",
  },
  {
    keywords: ["body", "heart", "bones", "blood", "brain", "muscle"],
    reply:
      "Your body is a wonderful machine. Your heart is a pump about the size of your fist, and it beats all day and night to send blood everywhere you need it. Put your hand on your chest, can you feel it working? What part of the body makes you curious?",
    sticker: "Body Explorer",
  },
  {
    keywords: ["sleep", "dream", "tired", "nap"],
    reply:
      "Good thing to wonder about! When you sleep, your body rests and your brain tidies up everything you learned that day, a little like sorting after a busy market. Dreams are your brain playing with those memories. What did you learn today?",
    sticker: "Big Wonderer",
  },
];

export const kidFallback =
  "I love that you asked. Let us think about it together. Can you tell me a little more about what you noticed? Every good question starts with noticing something.";
