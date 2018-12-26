const express = require("express");
const app = express();
const PORT = 4006;

app.post('/upload', (req, res) => {
  console.log(`Server ${PORT} req from queue`, req.body)
  res.status(200).json({
    msg:"success",
    data:`From server ${PORT} test`
  });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})