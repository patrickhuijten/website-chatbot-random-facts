const puppeteer = require('puppeteer')
const dogFacts = require('dog-facts')
const cron = require('node-cron')
const fs = require('fs')
const run = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.goto('https://eli5.io')
    await page.waitForSelector('#crisp-chatbox')
    await page.click('.cc-unoo')
    const randomFact = `Hourly random dog fact: ${dogFacts.random()}`
    await page.evaluate((randomFact) => {
        const field = document.querySelector('textarea[name=message]')
        field.value = randomFact
    }, randomFact)

    const time = date.getDate() + '_' + date.getHours()
    const date = new Date(Date.now())
    
    await page.screenshot({ path: `${time}.png` })

    fs.writeFileSync(`${time}.log`, randomFact)
    await page.click('.cc-13gu')
    await browser.close()
}

run()