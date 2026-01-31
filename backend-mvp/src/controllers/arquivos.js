export async function upload(req, res) {
  // MVP: stub. Em produção, usar multer + storage (local/Azure/AWS).
  return res.status(201).json({ mensagem: &#39;Upload (stub) - não implementado no MVP&#39;
});
}

13) backend-mvp/src/routes/auth.js

import { Router } from &#39;express&#39;;
import { login } from &#39;../controllers/auth.js&#39;;
const router = Router();

router.post(&#39;/login&#39;, login);

export default router;
