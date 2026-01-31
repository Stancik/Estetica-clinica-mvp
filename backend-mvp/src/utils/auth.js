import jwt from &#39;jsonwebtoken&#39;;

export function authRequired(req, res, next) {
  const header = req.headers.authorization || &#39;&#39;;
  const token = header.startsWith(&#39;Bearer &#39;) ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: &#39;Token ausente&#39; });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: &#39;Token inválido&#39; });
  }
}
