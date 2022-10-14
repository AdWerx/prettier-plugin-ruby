const { nodes } = require("lib-ruby-parser");
const fs = require("fs");

const force = process.argv.includes("--force");
let operation;

if (process.argv.includes("update")) operation = "update";

const template = (name) => {
  return `// gen:mayoverwrite
import { nodes } from "lib-ruby-parser";
import { doc } from "prettier";
import { NodePrinter } from "../";
const { builders: b } = doc;

const print${name}: NodePrinter<nodes.${name}> = (path, options, print) => {
  const node = path.getValue();
  console.log(\`-${name}-\`);
  return \`❗️${name}\`;
}

export default print${name};
`;
};

const templateTest = (name) => {
  return `// gen:mayoverwrite
import { runNodeFixtureTests } from "../test-helper";

runNodeFixtureTests("${name}");
`;
};

const templateFixtures = (name) => {
  return `# ${name} Formatting

## Fails because no tests are written

Before:
\`\`\`ruby
foo
\`\`\`

After:
\`\`\`ruby
bar
\`\`\`
`;
};

const update = (name, path, template) => {
  const exists = fs.existsSync(path);
  let mayoverwrite = false;

  if (exists) {
    mayoverwrite = fs.readFileSync(path, "utf8").includes("gen:mayoverwrite");
  }

  if (exists && !mayoverwrite && !force) {
    console.log(`S ${path}`);
    return;
  }

  console.log(`W ${path}`);
  fs.writeFileSync(path, template(name));
};

for (const name of Object.keys(nodes)) {
  // update(name, `src/nodes/${name}.ts`, template);
  update(name, `src/nodes/${name}.test.ts`, templateTest);
  // update(name, `src/nodes/${name}.fixtures.md`, templateFixtures);
}

console.log("done");
