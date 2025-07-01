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

    // Espera fixamente alguns segundos para o JS da página rodar
    console.log("⏳ Aguardando 5 segundos para carregar todo o conteúdo dinâmico...");
    await page.waitForTimeout(8000);

    // Captura o HTML completo
    const htmlFinal = await page.content();
    console.log("✅ HTML FINAL (com vídeo carregado):\n");
    console.log(htmlFinal);

    await browser.close();
  } catch (error) {
    console.error("⚠️ Erro ao executar Puppeteer:", error.message);
    process.exit(1);
  }
})();
