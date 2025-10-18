import * as cheerio from "cheerio";
import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";

const randomId = () => nanoid(6);

class ShortenURL {
  htmlFile = "";
  htmlShort = "";
  urls = {};

  constructor() {
    makeAutoObservable(this);
    this.fetchURLS();
  }

  setOriginalHTMLFile(content) {
    this.htmlFile = content;
  }

  fetchURLS() {
    // pass in array of urls from html, and then return the map of long urls to short urls
    this.urls = {};
  }

  updateURLS() {
    // pass in this.urls to the database to save it.
  }

  getNewHref(oldHref) {
    if (this.urls[oldHref]) return this.urls[oldHref];
    const newId = randomId();
    this.urls[oldHref] = newId;
  }

  shortenURL() {
    const $ = cheerio.load(this.htmlFile);
    $("a").each((index, element) => {
      const oldHref = $(element).attr("href");
      if (oldHref) {
        const newHref = this.getNewHref(oldHref);
        $(element).attr("href", newHref);
      }
    });

    const updatedHtml = $.html();
    this.htmlShort = updatedHtml;
  }

  downloadHTML() {
    const blob = new Blob([this.htmlShort], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "shortened.html";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export default new ShortenURL();
