/**
 * Splits comma-separated copy into list items, keeping a phrase such as
 * "Deep expertise in AI/ML, LLMs, and LangChain" or "AWS, Azure, and GCP deployments" in one piece.
 * Commas inside brackets are left alone.
 */
const splitList = (text: string): string[] => {
  const parts = text.split(/,(?![^(]*\))/).map((t) => t.trim()).filter(Boolean);
  const items: string[] = [];
  for (const part of parts) {
    if (!/^and\s/i.test(part) || items.length === 0) {
      items.push(part);
      continue;
    }
    // "and X" closes a list: join it with the single words before it and the phrase they belong to.
    const run = [part];
    while (items.length > 0 && !/\s/.test(items[items.length - 1])) run.unshift(items.pop() as string);
    if (items.length > 0) run.unshift(items.pop() as string);
    items.push(run.join(', '));
  }
  return items;
};

export default splitList;
