const {Pool} = require('pg')
const pool = new Pool({
    connectionString: 'postgres://juniukfpehmdne:236f3ffe26068d48891647c5f929636d231836c7806fa93371364b346605415f@ec2-34-225-167-77.compute-1.amazonaws.com:5432/de9lhvo95dcacl',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}
