import { useContext } from 'react'
import { ScrapeContext } from './ScrapeContext'
import Chart from './Chart'
import Table from './Table'

export default function Data() {
  const { scrapes, fetchScrapes } = useContext(ScrapeContext)
  return (
    <div>
      <button onClick={fetchScrapes}>Refresh data</button>
      <Chart data={scrapes.instagram} />

      <h2>Twitter</h2>
      <Table scrapes={scrapes.twitter} />

      <h2>Instagram</h2>
      <Table scrapes={scrapes.instagram} />
    </div>
  )
}
