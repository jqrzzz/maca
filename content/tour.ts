/**
 * Copy for the first-run guided tour of the /preview demo. Content as data so it
 * stays easy to edit and, later, to translate. English first.
 *
 * The tour walks one full loop: a village steward welcomes a child, signs out,
 * then signs back in as that child and lands in their learning space. The tour
 * performs the safe screen changes itself and hands control back at the two
 * moments only a person can do (filling the welcome form, and signing in with a
 * picture and a PIN).
 *
 * Voice: warm, plain, honest. Short sentences. No jargon.
 */

/** How a step finishes and moves on. */
export type TourGate = "next" | "roster" | "view-learner" | "done";

/** The screen a step belongs to. */
export type TourView = "login" | "steward" | "learner";

export type TourStep = {
  id: string;
  /** lucide-react icon name, mapped to a component in Tour.tsx. */
  icon: string;
  title: string;
  body: string;
  /** data-tour-id of the element to highlight, or null to float in the middle. */
  spotlight: string | null;
  /** The screen this step expects to be on; the tour puts the app there. */
  view: TourView;
  /** How the step advances. */
  gate: TourGate;
  /** Dim the rest of the screen. Defaults to true. */
  dim?: boolean;
  /** A short nudge for a step where the visitor does the action. */
  hint?: string;
  /** A safety net so a hand-off step can never trap the visitor. */
  skip?: "to-learner";
};

export const tourSteps: TourStep[] = [
  {
    id: "door",
    icon: "doorOpen",
    title: "This is the door",
    body: "Millions of people have no proof they exist, so no school or clinic will let them in. This is the door we are building for them. In about a minute you will welcome one child, then walk in as them.",
    spotlight: null,
    view: "login",
    gate: "next",
  },
  {
    id: "cockpit",
    icon: "compass",
    title: "Your cockpit",
    body: "I have placed you in the village steward's seat. This bar at the bottom lets you stand in anyone's shoes here, and nothing you do is ever saved.",
    spotlight: "demobar-trigger",
    view: "steward",
    gate: "next",
  },
  {
    id: "steward",
    icon: "heartHandshake",
    title: "Meet the steward",
    body: "The steward is not a teacher or a computer person. They are a trusted grown-up in the village, and their whole job is to make a visit safe, warm, and welcoming.",
    spotlight: null,
    view: "steward",
    gate: "next",
  },
  {
    id: "enroll",
    icon: "userPlus",
    title: "Welcome a child",
    body: "Tap Enroll to begin. Consent always comes first: the family decides, in their own language, and they can change their mind any time without losing a thing.",
    spotlight: "steward-tab-enroll",
    view: "steward",
    gate: "next",
    hint: "Tap Enroll to open the form",
  },
  {
    id: "welcome",
    icon: "userPlus",
    title: "Add them, step by step",
    body: "Agree to consent, add a name, an optional photo, then the quiet magic: a child with no email signs in by picking a picture and tapping a four digit PIN they choose with their family. I will notice the moment they are welcomed.",
    spotlight: "enroll-next",
    view: "steward",
    gate: "roster",
    hint: "Finish the steps, then press Create",
  },
  {
    id: "welcomed",
    icon: "partyPopper",
    title: "Welcomed",
    body: "That child is now on the roster and can walk through the front door on their own. It is demo data, so nothing is saved or sent. Now let us go and become that child.",
    spotlight: "enroll-success",
    view: "steward",
    gate: "next",
  },
  {
    id: "frontdoor",
    icon: "keyRound",
    title: "Now you are them",
    body: "You signed out as the helper, and now you arrive as the child you welcomed. Students sign in differently from staff, with a picture and a PIN, because that is who they are.",
    spotlight: "auth-role-student",
    view: "login",
    gate: "next",
    hint: "Choose Student or family",
  },
  {
    id: "signin",
    icon: "keyRound",
    title: "Tap your face, tap your PIN",
    body: "Choose Student or family, tap a face, then tap any four digits and press Sign in. A picture and four taps, no reading needed. Any face and any PIN work in the demo. I will notice when you are in.",
    spotlight: "auth-student-grid",
    view: "login",
    gate: "view-learner",
    hint: "Pick a face and a PIN, then Sign in",
    skip: "to-learner",
  },
  {
    id: "kidmode",
    icon: "sparkles",
    title: "Inside the learning space",
    body: "Here is where the child stands. A kind, patient helper that answers anything, reads out loud, and works in their language. A curious child with no school just found one, through a door that finally recognized them.",
    spotlight: null,
    view: "learner",
    gate: "next",
    dim: false,
  },
  {
    id: "done",
    icon: "heart",
    title: "That is the whole loop",
    body: "In one minute you welcomed a child and walked in as them. That is the loop the foundation runs in the field. Use the cockpit at the bottom to visit every other role the same way.",
    spotlight: null,
    view: "learner",
    gate: "done",
  },
];
