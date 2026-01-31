import { Router } from &#39;express&#39;;
import { authRequired } from &#39;../utils/auth.js&#39;;
import { upload } from &#39;../controllers/arquivos.js&#39;;

const router = Router();
router.use(authRequired);

router.post(&#39;/&#39;, upload);

export default router;
