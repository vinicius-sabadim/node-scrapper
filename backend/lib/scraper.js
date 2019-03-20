import axios from 'axios'
import cheerio from 'cheerio'
import db from './db'

export async function getHTML(url) {
  const { data: html } = await axios.get(url)
  return html
}

export async function getInstagramFollowers(html) {
  const $ = cheerio.load(html)
  const data = $('script[type="application/ld+json"]').html()
  const pageObject = JSON.parse(data)
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount,
    10
  )
}

export async function getTwitterFollowers(html) {
  const $ = cheerio.load(html)
  const span = $('[data-nav="followers"] .ProfileNav-value')
  return span.data('count')
}

export async function getInstagramCount() {
  // const html = await getHTML('https://www.instagram.com/thundets/')
  const html = await getHTML('https://www.instagram.com/jimmyfallon/')
  const count = await getInstagramFollowers(html)
  return count
}

export async function getTwitterCount() {
  // const html = await getHTML('https://twitter.com/thundets')
  const html = await getHTML('https://twitter.com/jimmyfallon')
  const count = await getTwitterFollowers(html)
  return count
}

export async function runCron() {
  const [instagramCount, twitterCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ])
  db.get('twitter')
    .push({ date: Date.now(), count: twitterCount })
    .write()
  db.get('instagram')
    .push({ date: Date.now(), count: instagramCount })
    .write()
  console.log('Done!')
}
