import API from "lambda-api";
import shortenURLs from "./shortenURLs";

const api = API();

api.post("/shorten/:url", async (req, res) => {
  const { url } = req.params || {};
  console.log(url);
  const output = shortenURLs();
  return res.status(200).json(output);
});

export const handler = async (event, context) => await api.run(event, context);
