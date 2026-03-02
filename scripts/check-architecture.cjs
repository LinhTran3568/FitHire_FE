const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');

const required = ['components', 'features', 'pages', 'lib', 'hooks'];
let failed = false;

required.forEach(dir => {
  const p = path.join(src, dir);
  if (!fs.existsSync(p)) {
    console.error(`✖ Missing required folder: src/${dir}`);
    failed = true;
  }
});

// Basic import pattern checks: forbid absolute imports starting with src/ (encourage aliases)
const walk = dir => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const fp = path.join(dir, f.name);
    if (f.isDirectory()) walk(fp);
    else if (f.isFile() && /\.(ts|tsx|js|jsx)$/.test(f.name)) {
      const content = fs.readFileSync(fp, 'utf8');
      const re = /from ['"]src\//g;
      if (re.test(content)) {
        console.error(`✖ Forbidden absolute import "src/..." found in ${path.relative(root, fp)}`);
        failed = true;
      }
    }
  }
};

walk(src);

if (failed) {
  console.error('\nArchitecture checks failed — fix the issues above.');
  process.exit(2);
}

console.log('✔ Architecture quick checks passed.');
process.exit(0);
