import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));

let changedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace ugly purple gradients with modern deep indigo/blue and emerald
  // violet -> indigo
  // purple -> blue/cyan depending on context. Let's do violet -> indigo and purple -> violet (wait, no purple at all).
  content = content.replace(/violet-(\d+)/g, 'blue-$1');
  content = content.replace(/purple-(\d+)/g, 'indigo-$1');
  
  // Specific gradient tuning to make it extremely modern
  // from-slate-950 via-indigo-950 to-blue-900 -> from-slate-950 via-slate-900 to-indigo-950
  content = content.replace(/from-slate-950 via-indigo-950 to-blue-900/g, 'from-slate-950 via-slate-900 to-indigo-950');
  content = content.replace(/from-slate-900 via-indigo-950 to-violet-900/g, 'from-slate-900 via-slate-800 to-indigo-900');
  content = content.replace(/from-violet-950 via-indigo-950 to-blue-900/g, 'from-slate-950 via-indigo-950 to-blue-900');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log('Fixed colors in', file);
  }
}

console.log(`Successfully fixed colors in ${changedFiles} files.`);
