import { readFileSync } from "fs";

const filePath = "input.txt";

export default function shortenURLs() {
  try {
    const html = readFileSync(filePath, "utf8");
    console.log({ html });
  } catch {
    console.error("failed to read");
  }
  return "Will I work?";
}
