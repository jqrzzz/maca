/**
 * Grants tracker (v0) — types. A local pipeline of funder opportunities the
 * Grants copilot feeds into. The real pipeline.json is git-ignored (it's your
 * funding strategy); a committed pipeline.example.json shows the shape.
 */

export type GrantStatus =
  | "researching"
  | "drafting"
  | "applied"
  | "won"
  | "declined";

export type PipelineEntry = {
  funder: string;
  status: GrantStatus;
  /** Grant size as text, e.g. "USD 2,000–10,000". */
  amount?: string;
  /** Application deadline, ISO YYYY-MM-DD. */
  deadline?: string;
  url?: string;
  notes?: string;
};

export type Pipeline = PipelineEntry[];
