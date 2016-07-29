import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import {DB_NAME, CACERT} from './modules/global/constants'

dotenv.config({silent: true})

const port = process.env.PORT || 9001
const rethinkdb = {
	host: process.env.RDB_HOST_PERSONAL,
	port: process.env.RDB_PORT_PERSONAL,
  authkey: process.env.RDB_AUTHKEY_PERSONAL,
	db: DB_NAME,
  caCert: process.env.CA_CERT
}
const serverConfig = {
  host: '0.0.0.0',
  port,
  rethinkdb
}

export default serverConfig
