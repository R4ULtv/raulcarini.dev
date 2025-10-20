export const fetcher = <T>(url: string, options?: RequestInit): Promise<T> =>
  fetch(url, { ...options }).then((res) => {
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return res.json() as Promise<T>;
  });
