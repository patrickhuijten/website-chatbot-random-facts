const puppeteer = require('puppeteer')
const dogFacts = require('dog-facts')
const cron = require('node-cron')
const fs = require('fs')
const sleep = require('sleep-promise')
const run = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.goto('https://eli5.io')
    await page.waitForSelector('#crisp-chatbox')
    await page.click('.cc-unoo')
    const randomFact = `Hourly random dog fact: ${dogFacts.random()}`
    page.type('textarea[name=message]', randomFact)

    await sleep(2000)

    const date = new Date(Date.now())
    const time = date.getDate() + '_' + date.getHours()

    await page.screenshot({ path: `${time}.png` })

    fs.writeFileSync(`${time}.log`, randomFact)
    await page.click('.cc-13gu')
    await browser.close()
}

run()