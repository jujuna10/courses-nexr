import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    user: 'postgres',
    password: 'jujuna10',
    host: 'localhost',
    port: 5432,
    database:"courses"
});

export default pool