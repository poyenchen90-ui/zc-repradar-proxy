export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { base, table, offset } = req.query;
  if (!base || !table) return res.status(400).json({ error: 'Missing base or table' });

  let url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?pageSize=100`;
  if (offset) url += `&offset=${offset}`;

  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` },
  });
  const data = await resp.json();
  return res.status(resp.status).json(data);
}
