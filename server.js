const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
const root = __dirname + "/dist";
app.use(express.static(root));
app.get("*/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Мой текст в логе после запуска ${PORT}!`);
});
