import express from 'express'
import cors from 'cors'
import api from './api'
import path from 'path'

const router = express.Router()

// cors setting
const whitelist = [
  'http://127.0.0.1:3000',
  'http://zensa-staging.herokuapp.com',
  'https://zensa-staging.herokuapp.com',
  'http://zensa.herokuapp.com',
  'https://zensa.herokuapp.com',
  'http://zensaskincare.com',
  'https://zensaskincare.com'
];
const corsOptions = {
  origin(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

// const corsOptions = {origin: /[\s\S]/}
router.use(cors(corsOptions))
router.options('*', cors(corsOptions))

// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// API routes
router.use('/api', api)

export default router
