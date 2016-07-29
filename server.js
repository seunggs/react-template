import path from 'path'
import express from 'express'
import {Server} from 'http'
import config from './server-config'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import apiRoutes from './server/routes'
import React from 'react'
import compression from 'compression'

const app = express()
const server = Server(app)

// Compress (gzip)
app.use(compression())

// set up express
app.use(morgan('dev')) // log every request to the console
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(express.static(process.cwd(), {maxAge: 31557600000}))

// set up router
app.use('/', apiRoutes)

server.listen(config.port, config.host, () => console.log(`Listening on ${config.port}`))
