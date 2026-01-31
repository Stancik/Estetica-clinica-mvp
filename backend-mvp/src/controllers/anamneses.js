import { query } from &#39;../utils/db.js&#39;;

export async function create(req, res) {
  const {
    cliente_id, possui_doencas, quais_doencas, faz_uso_medicamentos,
quais_medicamentos,
    alergias, gestante, procedimentos_anteriores, queixa_principal, consentimento_lgpd
  } = req.body || {};
  if (!cliente_id) return res.status(400).json({ error: &#39;cliente_id é obrigatório&#39; });
  if (!consentimento_lgpd) return res.status(400).json({ error: &#39;consentimento_lgpd é
obrigatório&#39; });

  const { rows } = await query(
    `INSERT INTO anamneses (cliente_id, possui_doencas, quais_doencas,
faz_uso_medicamentos, quais_medicamentos, alergias, gestante,
procedimentos_anteriores, queixa_principal, consentimento_lgpd, data_preenchimento)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW()) RETURNING *`,
    [cliente_id, possui_doencas, quais_doencas, faz_uso_medicamentos,
quais_medicamentos, alergias, gestante, procedimentos_anteriores, queixa_principal,
consentimento_lgpd]

  );
  res.status(201).json(rows[0]);
}
