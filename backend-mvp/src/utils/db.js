import pkg from &#39;pg&#39;;
const { Pool } = pkg;
import dotenv from &#39;dotenv&#39;;
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log(&#39;db&#39;, { text, duration, rows: res.rowCount });
  return res;
}

export default pool;
