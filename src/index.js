const fs = require("fs");
const { parse } = require("node-html-parser");

function visit(node, data = {}) {
  if (node.nodeType === 3) return;

  switch (true) {
    case node.rawTagName === "a":
    case node.rawTagName === "br":
    case node.getAttribute("class")?.includes?.("noprint"):
      break;

    default:
      console.log(`<${node.rawTagName} ${node.rawAttrs ?? ""}>`);
  }

  for (const child of node.childNodes) {
    visit(child);
  }
}

async function main() {
  const rfc = fs.readFileSync("data/rfc7230").toString();
  let node = parse(rfc);

  visit(node);
}

main().catch(console.error);
