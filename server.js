import express from 'express'
import next from 'next'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import api from './api'
import HomePage from './pages'
import ProductPage from './pages/product'
import AboutPage from './pages/about'

const server = express()
const port = 3000

server.get('/manual-render/about', (req, res) => {
  res.end(ReactDOMServer.renderToString(<AboutPage />))
})

server.get('/manual-render/product/:sku', (req, res) => {
  res.end(ReactDOMServer.renderToString(<ProductPage url={{ query: { ...req.query, ...req.params } }} />))
})

server.get('/manual-render/*', (req, res) => {
  res.end(ReactDOMServer.renderToString(<HomePage />))
})

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare()

server.use('/api', api)

server.get('/product/:sku', (req, res) => {
  app.render(req, res, '/product', { ...req.query, ...req.params })
})

server.get('/*', (req, res) => handle(req, res))

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
