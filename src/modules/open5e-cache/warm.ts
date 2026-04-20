import { getCategory, setCategory } from "./db";
import paginate from "./paginate";
import { categoryConfig, type Category, type CategoryEntry } from "./config";

const TTL_MS = 7 * 24 * 60 * 60 * 1000;
function isStale(fetchedAt: number): boolean {
  return Date.now() - fetchedAt > TTL_MS;
}

export async function warmOne(name: Category, entry: CategoryEntry) {
  const cached = await getCategory(name);
  if (cached && !isStale(cached.fetchedAt)) return;
  const entries = await paginate(entry.listFn, entry.baseQuery);
  await setCategory(name, entries);
}

let warming: Promise<unknown> | null = null;

export async function warmAll() {
  if (!warming) {
    warming = (async () => {
      const names = Object.keys(categoryConfig) as Category[];
      const tasks = names.map((name) => warmOne(name, categoryConfig[name]));
      await Promise.allSettled(tasks);
      console.log("warmed");
    })();
  }
  return warming;
}
