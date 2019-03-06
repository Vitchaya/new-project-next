import express from 'express'
import products from './products'

const server = express()

server.get('/status', (req, res) => {
  res.json({ status: true })
})

server.use('/products', products)

export default server