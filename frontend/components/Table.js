import { distanceInWords } from 'date-fns'

export default function Table({ scrapes }) {
  const scrapesReversed = [...scrapes].reverse()
  return (
    <table>
      <thead>
        <tr>
          <th>Count</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {scrapesReversed.map(scrape => (
          <tr key={scrape.date}>
            <td>{scrape.count}</td>
            <td>{distanceInWords(scrape.date, new Date())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
