import express from 'express'
import cors from 'cors'
import { getInstagramCount, getTwitterCount } from './lib/scraper'
import db from './lib/db'
// import './lib/cron'
import { uniqueCount } from './lib/utils'

const app = express()
app.use(cors())

app.get('/scrape', async (req, res, next) => {
  console.log('Scrapping...')
  const [instagramCount, twitterCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ])
  res.json({ instagramCount, twitterCount })
})

app.get('/data', async (req, res, next) => {
  const { instagram, twitter } = db.value()
  res.json({ instagram: uniqueCount(instagram), twitter: uniqueCount(twitter) })
})

const PORT = 4321
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
