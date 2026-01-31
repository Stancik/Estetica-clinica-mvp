import { query } from &#39;../utils/db.js&#39;;

export async function list(req, res) {
  const { rows } = await query(&#39;SELECT * FROM agendamentos ORDER BY data,
hora_inicio&#39;);
  res.json(rows);
}

export async function create(req, res) {
  const { cliente_id, data, hora_inicio, duracao_minutos, procedimento_descricao,
status, observacoes } = req.body || {};
  const { rows } = await query(
    `INSERT INTO agendamentos (cliente_id, data, hora_inicio, duracao_minutos,
procedimento_descricao, status, observacoes)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,

    [cliente_id, data, hora_inicio, duracao_minutos, procedimento_descricao, status,
observacoes]
  );
  res.status(201).json(rows[0]);
}
