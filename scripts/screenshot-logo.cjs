const puppeteer = require("puppeteer");
const httpServer = require("http-server");

(async () => {
  const server = httpServer.createServer({ root: __dirname });
  server.listen(3001);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3001/logo.html", {
    waitUntil: "networkidle0",
  });
  const elements = await page.$(".container");
  await page.evaluate(() => {
    document.body.style.background = "transparent";
  });
  await elements.screenshot({ path: "logo.png", omitBackground: true });
  await browser.close();
  server.close();
})();
