import * as cheerio from "cheerio";
import { nanoid } from "nanoid";

const randomId = () => nanoid(6);
const urlMap = {};

function downloadHTML(content) {
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "shortened.html";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revolkeObjectURL(url);
}

function getNewHref(oldHref) {
  if (urlMap[oldHref]) return urlMap[oldHref];
  const newId = randomId();
  urlMap[oldHref] = newId;
}

export default function shortenURL({ htmlFile }) {
  const $ = cheerio.load(htmlFile);
  $("a").each((index, element) => {
    const oldHref = $(element).attr("href");
    if (oldHref) {
      console.log(oldHref);
      const newHref = getNewHref(oldHref);
      $(element).attr("href", newHref);
    }
  });

  const updatedHtml = $.html();
  downloadHTML(updatedHtml);
}
