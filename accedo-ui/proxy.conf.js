module.exports = {
  "/movies": {
    "target": "https://demo2697834.mockable.io",
    "secure": true,
    "logLevel": "debug",
    "changeOrigin": true
  },
  "/api/*": {
    "target": "http://localhost:3000",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  }


}
