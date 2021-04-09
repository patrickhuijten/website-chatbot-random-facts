const puppeteer = require('puppeteer')
const dogFacts = require('dog-facts')
const cron = require('node-cron')
const fs = require('fs')
const run = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://eli5.io')
    await page.waitForSelector('#crisp-chatbox')
    await page.click('.cc-unoo')
    const randomFact = `Hourly random dog fact: ${dogFacts.random()}`
    await page.evaluate((randomFact) => {
        const field = document.querySelector('textarea[name=message]')
        field.value = randomFact
    }, randomFact)

    await page.screenshot({ path: `${time}.png` })

    const date = new Date(Date.now())
    const time = date.getDate() + '_' + date.getHours()
    fs.writeFileSync(`${time}.log`, randomFact)
    await page.click('.cc-13gu')
    await browser.close()
}

run()