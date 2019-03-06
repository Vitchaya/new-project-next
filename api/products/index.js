import express from 'express'

const server = express()

server.get('/', (req, res) => {
  res.json({ product: true })
})

export default server