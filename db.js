const Pool = require ('pg').Pool;

const pool= new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    user:"uifsgknlpgvgrl",
    host:"ec2-35-168-194-15.compute-1.amazonaws.com",
    database:"d1ve3eaujva5b1",
    password:"e8cf8bd74be9b5d987ab23f250724fcc958c375893547b7e407eb03a95c231e7",
    port:5432,
});


module.exports= pool;


