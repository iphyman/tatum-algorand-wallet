export function cache(key: string, data?: any) {
  switch (arguments.length) {
    case 2:
      if (data === null) return window.localStorage.removeItem(key);
      return window.localStorage.setItem(key, JSON.stringify(data));

    case 1:
      try {
        const cached = window.localStorage.getItem(key);

        if (!cached) return null;

        return JSON.parse(cached);
      } catch (error) {
        return null;
      }
    default:
      return;
  }
}
