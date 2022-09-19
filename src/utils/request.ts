export const makeRequest = async (endpoint: string, payload?: any) => {
  const res = await fetch(endpoint, {
    method: payload ? "POST" : "GET",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

export const getChartData = async ({
  id,
  currency = "usd",
  days = "max",
  interval = "daily",
}: {
  id: string;
  currency?: string;
  days?: string;
  interval?: string;
}) => {
  const endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`;

  return await makeRequest(endpoint);
};
