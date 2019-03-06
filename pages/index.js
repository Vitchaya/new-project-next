import { useEffect, useState } from 'react'
import axios from 'axios'

export default () => {
  const [status, setStatus] = useState()

  useEffect(() => {
    async function fetchStatus() {
      const { data: { status } } = await axios({
        method: 'get',
        baseURL: 'http://localhost:3000/api',
        url: '/status'
      })
      setStatus(status)
    }
    fetchStatus()
  }, [])

  return (
    <>
      Hello From Next.js!
      <br />
      api status is {!status && 'un'}healthy
    </>
  )
}
