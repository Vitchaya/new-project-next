import { useState } from 'react'
import axios from 'axios'

const getPrice = async (sku) => {
  const { data } = await axios({
    method: 'get',
    baseURL: 'http://localhost:3000/api',
    url: `/products/${sku}`
  })
  return data
}

const ProductPage = ({ url, price: initialPrice }) => {
  const { query: { sku } = {} } = url
  const [price, setPrice] = useState(initialPrice)
  const refreshPrice = async () => {
    const { name, price } = await getPrice(sku)
    setPrice(price)
  }
  return (
    <>
      {`product ${sku || 'no-name'}`}
      <br />
      <br />
      price: {price}
      <br />
      <br />
      <button onClick={refreshPrice}>refresh</button>
    </>
  )
}

ProductPage.getInitialProps = async ({ req }) => {
  const { price } = await getPrice(req.query.sku)
  return { price }
}

export default ProductPage
