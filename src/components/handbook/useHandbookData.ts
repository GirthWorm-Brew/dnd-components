import { useState, useEffect } from "react";

type RetrieveMethod = (params: { path: { key: string } }) => Promise<{ data: unknown }>;

export function useHandbookData<T>(
  id: string | undefined,
  retrieveMethod: RetrieveMethod,
  typeGuard: (data: unknown) => data is T
): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function load() {
      if (!id) return;
      try {
        const res = await retrieveMethod({ path: { key: id } });
        if (typeGuard(res.data)) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, retrieveMethod, typeGuard]);

  return { data, loading };
}