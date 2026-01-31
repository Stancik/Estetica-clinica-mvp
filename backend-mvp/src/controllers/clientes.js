import { query } from &#39;../utils/db.js&#39;;

export async function list(req, res) {
  const { rows } = await query(&#39;SELECT * FROM clientes ORDER BY id DESC&#39;);
  res.json(rows);
}

export async function create(req, res) {

  const { nome_completo, telefone, email, data_nascimento, observacoes } = req.body ||
{};
  if (!nome_completo) return res.status(400).json({ error: &#39;nome_completo é obrigatório&#39;
});
  const { rows } = await query(
    &#39;INSERT INTO clientes (nome_completo, telefone, email, data_nascimento,
observacoes) VALUES ($1,$2,$3,$4,$5) RETURNING *&#39;,
    [nome_completo, telefone, email, data_nascimento, observacoes]
  );
  res.status(201).json(rows[0]);
}

export async function getById(req, res) {
  const { id } = req.params;
  const { rows } = await query(&#39;SELECT * FROM clientes WHERE id=$1&#39;, [id]);
  if (rows.length === 0) return res.status(404).json({ error: &#39;Não encontrado&#39; });
  res.json(rows[0]);
}

export async function update(req, res) {
  const { id } = req.params;
  const { nome_completo, telefone, email, data_nascimento, observacoes } = req.body ||
{};
  const { rows } = await query(
    &#39;UPDATE clientes SET nome_completo=$1, telefone=$2, email=$3,
data_nascimento=$4, observacoes=$5, atualizado_em=NOW() WHERE id=$6
RETURNING *&#39;,
    [nome_completo, telefone, email, data_nascimento, observacoes, id]
  );

  if (rows.length === 0) return res.status(404).json({ error: &#39;Não encontrado&#39; });
  res.json(rows[0]);
}

export async function remove(req, res) {
  const { id } = req.params;
  await query(&#39;DELETE FROM clientes WHERE id=$1&#39;, [id]);
  res.status(204).end();
}
