import { query } from &#39;../utils/db.js&#39;;
import bcrypt from &#39;bcryptjs&#39;;
import jwt from &#39;jsonwebtoken&#39;;

export async function login(req, res) {
  const { email, senha } = req.body || {};
  if (!email || !senha) return res.status(400).json({ error: &#39;Informe email e senha&#39; });
  try {

    const { rows } = await query(
      &#39;SELECT id, nome, email, senha_hash, perfil, ativo FROM usuarios WHERE
email=$1&#39;,
      [email]
    );
    const user = rows[0];
    if (!user || !user.ativo) return res.status(401).json({ error: &#39;Credenciais inválidas&#39; });
    const ok = await bcrypt.compare(senha, user.senha_hash);
    if (!ok) return res.status(401).json({ error: &#39;Credenciais inválidas&#39; });
    const token = jwt.sign({ id: user.id, nome: user.nome, perfil: user.perfil },
process.env.JWT_SECRET, { expiresIn: &#39;8h&#39; });
    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: &#39;Erro ao autenticar&#39; });
  }
}
