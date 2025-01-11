// import pg from "pg-promise"
// // const {Pool} = pkg
// // import {config} from "dotenv"

// config();

// const pool = new pg({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// export default pool;



import pgp from "pg-promise"
const pg = pgp();
const db = pg(`postgres://postgres:saunok@localhost:5432/bookrental`);

export default db;

