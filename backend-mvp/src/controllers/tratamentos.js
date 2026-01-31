import { query } from &#39;../utils/db.js&#39;;

export async function create(req, res) {
  const {
    cliente_id, agendamento_id, descricao_procedimento, produtos_utilizados,
    observacoes_clinicas, intercorrencia_ocorreu, descricao_intercorrencia,
data_atendimento
  } = req.body || {};

  if (!cliente_id || !descricao_procedimento)
    return res.status(400).json({ error: &#39;cliente_id e descricao_procedimento são
obrigatórios&#39; });

  const { rows } = await query(
    `INSERT INTO tratamentos (cliente_id, agendamento_id, descricao_procedimento,
produtos_utilizados, observacoes_clinicas, intercorrencia_ocorreu,
descricao_intercorrencia, data_atendimento)
     VALUES ($1,$2,$3,$4,$5,$6,$7,COALESCE($8, NOW())) RETURNING *`,
    [cliente_id, agendamento_id, descricao_procedimento, produtos_utilizados,
observacoes_clinicas, intercorrencia_ocorreu, descricao_intercorrencia,
data_atendimento]
  );
  res.status(201).json(rows[0]);

}
