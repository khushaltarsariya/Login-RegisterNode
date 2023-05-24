import {createConnection} from 'mysql'
require('dotenv').config();

export const connection =createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})