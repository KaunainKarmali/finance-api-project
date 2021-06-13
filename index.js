// *****************IMPORTS*****************
import express from "express";
import { getSearchResults, getStockPrice } from "./api.mjs";

const app = express();
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.post("/search", async (req, res) => {
  const keywords = req.body.keywords;
  const promise = getSearchResults(keywords);
  await promise
    .then((response) => {
      const data = response.body;
      res.send({ message: data });
    })
    .catch((error) => {
      res.send({ error });
    });
  res.end();
});

app.post("/price", async (req, res) => {
  const symbol = req.body.symbol;
  const promise = getStockPrice(symbol);
  await promise
    .then((response) => {
      const data = response.body;
      res.send({ message: data });
    })
    .catch((error) => {
      res.send({ error });
    });
  res.end();
});
