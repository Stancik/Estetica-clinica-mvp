import { query } from &#39;../utils/db.js&#39;;

export async function create(req, res) {
  const { cliente_id, descricao, valor_total, status, observacoes } = req.body || {};
  const { rows } = await query(
    `INSERT INTO orcamentos (cliente_id, descricao, valor_total, status, observacoes)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [cliente_id, descricao, valor_total, status, observacoes]
  );
  res.status(201).json(rows[0]);
}
