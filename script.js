const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.PAGE_URL;
  if (!url) {
    console.error("❌ Nenhuma URL fornecida.");
    process.exit(1);
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    console.log(`🌐 Acessando: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    // Aguarda até o iframe ser inserido (tempo máximo: 15 segundos)
    console.log("⏳ Aguardando a inserção do iframe do vídeo...");
    await page.waitForSelector('iframe#liveFrame', { timeout: 15000 });

    // Captura o HTML depois que o vídeo foi carregado
    const htmlFinal = await page.content();
    console.log("✅ HTML FINAL (com vídeo):\n");
    console.log(htmlFinal);

    await browser.close();
  } catch (error) {
    console.error("⚠️ Erro ao executar Puppeteer:", error.message);
    process.exit(1);
  }
})();
