import { Router } from &#39;express&#39;;
import { authRequired } from &#39;../utils/auth.js&#39;;
import { list, create, getById, update, remove } from &#39;../controllers/clientes.js&#39;;

const router = Router();
router.use(authRequired);

router.get(&#39;/&#39;, list);
router.post(&#39;/&#39;, create);
router.get(&#39;/:id&#39;, getById);
router.put(&#39;/:id&#39;, update);
router.delete(&#39;/:id&#39;, remove);

export default router;
