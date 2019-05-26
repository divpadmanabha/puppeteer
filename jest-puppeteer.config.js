module.exports = {
  launch: {
    headless: false,
    slowMo:10,
    args: [
      `--no-sandbox`,
      "--start-maximized",
      "--window-size=1920,1080",
      "--disable-setuid-sandbox",
      `--disable-infobars`
    ]
  }
};
