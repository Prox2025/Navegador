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

    // Espera fixa usando Promise + setTimeout (compatível com todas versões)
    console.log("⏳ Aguardando 5 segundos para carregar todo o conteúdo dinâmico...");
    await new Promise(resolve => setTimeout(resolve, 5000));

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
