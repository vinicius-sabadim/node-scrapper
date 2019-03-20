import { useEffect, useState } from 'react'
import { ScrapeProvider } from './ScrapeContext'

function useScrapes() {
  const [scrapes, setScrapes] = useState({
    instagram: [],
    twitter: []
  })

  async function fetchScrapes() {
    const res = await fetch('http://localhost:4321/data')
    const data = await res.json()
    setScrapes(data)
  }

  useEffect(function() {
    fetchScrapes()
  }, [])
  return { scrapes, fetchScrapes }
}

export default function Page({ children }) {
  const hookData = useScrapes()
  return (
    <ScrapeProvider value={hookData}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  )
}
