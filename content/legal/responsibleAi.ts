/**
 * Responsible AI policy. The public, formal version of the principles and red
 * lines in docs/concept.md, written to align with widely recognized frameworks
 * (OECD AI Principles, NIST AI Risk Management Framework, UNESCO Recommendation
 * on the Ethics of AI). Honest by default; REVIEW with the founder, and bump
 * lastUpdated when the text changes.
 */

export const responsibleAi = {
  lastUpdated: "June 2026",
  intro:
    "PRASM is an AI-native foundation: a tiny human team amplified by AI so that almost everything we have reaches the families we serve. This policy sets out how we use artificial intelligence responsibly and the limits we hold ourselves to. It applies to everyone who builds or operates AI tools on PRASM's behalf. It is written to align with widely recognized frameworks, including the OECD AI Principles, the US NIST AI Risk Management Framework, and the UNESCO Recommendation on the Ethics of Artificial Intelligence.",
  sections: [
    {
      title: "Our approach: human story, AI engine room",
      body: [
        "The story is human; the engine room is AI. Supporters meet the doctor and the families, never a bot. AI is simply how a very small team does the work of many, out of sight, so more time and money reach the village.",
        "The guiding rule is simple: AI proposes, a human decides. AI removes the typing, never the judgment.",
      ],
    },
    {
      title: "Human oversight and accountability",
      body: [
        "Every output that is public, clinical, or about an identifiable person is reviewed and approved by a person before it is used or shared. Public content (field notes, donor updates, social posts) is approved by the founder or a trusted delegate.",
        "Clinical AI output is informational reference only. It never makes a diagnosis or treatment decision; the doctor decides. Decisions about sensitive records rest with named, authorized people, and changes are logged.",
        "We do not deploy autonomous agents that act on the foundation's behalf without supervision. A named person is accountable for each AI tool we run.",
      ],
    },
    {
      title: "Data protection and privacy",
      body: [
        "We sort data into three tiers and treat each differently. Tier 0 is public information (published field notes and cleared stories), which AI may use freely. Tier 1 is operational data (donor contacts, drafts, inventory), used with care and with personal details minimized. Tier 2 is sensitive data: beneficiary identities, family links, undocumented status, medical information, and photos of identifiable people.",
        "Tier 2 is our red line. It is never sent to a general-purpose AI model without de-identification or the use of a private or local model, and it is held in an encrypted, access-controlled environment with access logged. We collect the minimum we need, keep it only as long as it is useful, and treat consent as explicit and revocable.",
        "This policy works alongside our Privacy policy and our Safeguarding policy, and is designed to be consistent with Thailand's Personal Data Protection Act (PDPA).",
      ],
    },
    {
      title: "Fairness, inclusion, and non-discrimination",
      body: [
        "We serve a multilingual community across Thai, Burmese, Kayan, and English, and we design our tools to reduce barriers rather than raise them. We watch for and work to mitigate bias in AI output, especially anything that could disadvantage the people we serve.",
        "AI is used to extend the reach of a caring human team, never to ration care or sort people in ways that strip their dignity.",
      ],
    },
    {
      title: "Transparency and honesty",
      body: [
        "AI never invents facts, numbers, names, quotes, or impact. Every claim is grounded in something real, or it does not ship.",
        "We are open that AI assists our back office, and we are equally clear about its limits. We do not present AI as the public face of the cause, and we do not imply it does more than it does.",
      ],
    },
    {
      title: "Safety and security",
      body: [
        "Reliability matters more than novelty for anything load-bearing. Tools are built low-connectivity-first: capture offline, process later, and fail safe.",
        "Sensitive systems use least-privilege access and strong security. Nothing is published or sent externally without human approval, and we never reveal the village's location or anything that could identify or endanger an undocumented person.",
      ],
    },
    {
      title: "Third-party models and vendors",
      body: [
        "We choose reputable providers and minimize the personal data placed in any prompt. Tier 2 data is never shared with a third-party model without de-identification or a private setup.",
        "We keep our data in plain, exportable formats so the foundation's memory belongs to the foundation, not to a vendor, and so we can change tools without losing it.",
      ],
    },
    {
      title: "What we will not do",
      body: [
        "We will never publish or send anything externally without human approval; never fabricate facts, numbers, names, quotes, or impact; never reveal information that could identify or endanger an undocumented person; never let AI make a clinical decision; never feed Tier 2 data to a third-party model without de-identification or a private setup; never make AI the mascot or fundraising hook of a cause about vulnerable people; and never run autonomous, unsupervised agents on the foundation's behalf.",
      ],
    },
    {
      title: "Governance, review, and raising a concern",
      body: [
        "This policy is owned by the founder today and will be overseen by our governing board as it forms. We review it at least once a year, and whenever our use of AI changes materially.",
        "Anyone (community members, supporters, or partners) can raise a concern about our use of AI through our Complaints and feedback process, or by contacting us directly. It sits alongside our wider Governance and Safeguarding commitments.",
      ],
    },
  ],
};
