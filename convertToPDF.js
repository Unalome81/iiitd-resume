const puppeteer = require('puppeteer');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function convertToPDF() {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: false, // Set to false to see the browser window
    });

    console.log('Opening new page...');
    const page = await browser.newPage();

    // Set optional viewport size
    console.log('Setting viewport...');
    await page.setViewport({ width: 1200, height: 800 });

    // Enter the path to the page with increased timeout
    console.log('Navigating to the page...');
    await page.goto('http://127.0.0.1:8081/', { waitUntil: 'networkidle0', timeout: 120000 });

    console.log('Waiting for the page to be fully loaded...');
    await sleep(5000); // Wait for 5 seconds to ensure the page is fully loaded

    console.log('Generating PDF...');
    // Generate text-editable PDF from the HTML page
    await page.pdf({
      path: 'resume.pdf',
      format: 'A4',
      printBackground: true, // Ensures that background colors are included
    });

    console.log('PDF generated successfully.');

    // Close the browser
    console.log('Closing browser...');
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

convertToPDF();
