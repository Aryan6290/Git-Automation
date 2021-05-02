const puppeteer = require("puppeteer");
const data = require("./config.json");
(async function () {
  const browser = await puppeteer.launch({ headless: false, args:[
    '--start-maximized' // you can also use '--start-fullscreen'
 ] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto(data.url, { waitUntil: "networkidle2" });

  await page.type("input[type='text']", data.user, { delay: 100 });
  await page.type("input[type='password']", data.password, { delay: 100 });
  await page.click("input[type='submit']");

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  const [response] = await Promise.all([
    
    await page.click('summary[role="button"]', { visible: true,delay:500 }),
    await page.click('a[role="menuitem"]', { visible: true,delay:500 }),
  ]);
  await page.waitForSelector('.select-menu-item-text');
    await page.evaluate(()=>document.querySelector('.select-menu-item-text').click())
  await page.waitForSelector('input[name="repository[name]"]');

  await page.focus('input[name="repository[name]"]')
   await page.type('input[name="repository[name]"]', data.repoName ,);
   await page.type('input[name="repository[description]"]',data.repoDescription, {delay:100 });

    await page.evaluate(()=>document.querySelector("button[data-disable-with='Creating repository…']").click())
    // try{
    //     await page.click("button[type='submit']");
    // }
    // catch(err){

    // }
    // await page.waitFor(3000);
    // await page.click("button[type='submit']");

  
  //       page.waitForNavigation()
  //   ])

})();
