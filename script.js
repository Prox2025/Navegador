const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.PAGE_URL;
  if (!url) {
    console.error("❌ Nenhuma URL fornecida.");
    process.exit(1);
  }

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    console.log(`🌐 Acessando: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    const html = await page.content();
    console.log("📄 HTML da página:\n");
    console.log(html);

    await browser.close();
  } catch (error) {
    console.error("⚠️ Erro ao executar Puppeteer:", error);
    process.exit(1);
  }
})();
