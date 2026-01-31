import { Router } from &#39;express&#39;;
import { authRequired } from &#39;../utils/auth.js&#39;;
import { list, create } from &#39;../controllers/agendamentos.js&#39;;

const router = Router();
router.use(authRequired);

router.get(&#39;/&#39;, list);
router.post(&#39;/&#39;, create);

export default router;
