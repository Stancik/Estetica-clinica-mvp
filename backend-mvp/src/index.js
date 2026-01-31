import express from &#39;express&#39;;
import cors from &#39;cors&#39;;
import helmet from &#39;helmet&#39;;
import dotenv from &#39;dotenv&#39;;
dotenv.config();

import authRoutes from &#39;./routes/auth.js&#39;;
import clientesRoutes from &#39;./routes/clientes.js&#39;;
import agendamentosRoutes from &#39;./routes/agendamentos.js&#39;;
import anamnesesRoutes from &#39;./routes/anamneses.js&#39;;
import tratamentosRoutes from &#39;./routes/tratamentos.js&#39;;
import orcamentosRoutes from &#39;./routes/orcamentos.js&#39;;
import arquivosRoutes from &#39;./routes/arquivos.js&#39;;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get(&#39;/health&#39;, (req, res) =&gt; res.json({ status: &#39;ok&#39;, time: new Date().toISOString() }));

app.use(&#39;/auth&#39;, authRoutes);
app.use(&#39;/clientes&#39;, clientesRoutes);

app.use(&#39;/agendamentos&#39;, agendamentosRoutes);
app.use(&#39;/anamneses&#39;, anamnesesRoutes);
app.use(&#39;/tratamentos&#39;, tratamentosRoutes);
app.use(&#39;/orcamentos&#39;, orcamentosRoutes);
app.use(&#39;/arquivos&#39;, arquivosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =&gt; console.log(`API rodando na porta ${PORT}`));
