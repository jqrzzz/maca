/**
 * Shared Claude call for the authoring scripts. One place to keep the model,
 * thinking, effort, and structured-output settings consistent and correct.
 *
 * Defaults follow the current API guidance: model claude-opus-4-8, adaptive
 * thinking (no temperature/budget_tokens — removed on 4.8), high effort, and a
 * JSON-schema-constrained response. Override the model with the given env var.
 */

/** Call Claude with a grounded prompt and a JSON schema; return parsed JSON. */
export async function callClaude<T>(opts: {
  system: string;
  user: string;
  schema: Record<string, unknown>;
  model?: string;
}): Promise<T> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();
  const res = await client.messages.create({
    model: opts.model ?? "claude-opus-4-8",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: {
      effort: "high",
      format: { type: "json_schema", schema: opts.schema },
    },
    system: opts.system,
    messages: [{ role: "user", content: opts.user }],
  });
  const block = res.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("No text block in the model response.");
  }
  return JSON.parse(block.text) as T;
}
