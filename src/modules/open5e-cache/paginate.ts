export type ListFn<TQuery, TItem> = (options: {
  query: TQuery & { page?: number };
}) => Promise<{
  data?: { results: TItem[]; next?: string | null };
}>;

export default async function paginate<TQuery, TItem>(
  listfn: ListFn<TQuery, TItem>,
  baseQuery: TQuery,
): Promise<TItem[]> {
  const all: TItem[] = [];
  let page = 1;
  const MAX_PAGES = 500;
  while (page <= MAX_PAGES) {
    const response = await listfn({ query: { ...baseQuery, page } });
    if (!response.data) break;
    all.push(...response.data.results);
    if (!response.data.next) break;
    page += 1;
  }
  return all;
}
