import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:1234/v1',
  apiKey: 'not-needed',
});

// Pfad zu deinen Seiten (anpassen falls nötig, z.B. 'app')
const targetDir = path.join(process.cwd(), 'app');

function getFiles(dir, fileList = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file === 'page.tsx' || file === 'page.js') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

async function run() {
  const pages = getFiles(targetDir);
  console.log(${pages.length} Seiten gefunden. Starte Bearbeitung...);

  for (const file of pages) {
    const code = fs.readFileSync(file, 'utf8');
    
    // Überspringen, wenn die Komponente schon drin ist
    if (code.includes('AffiliateBox')) continue;

    const prompt = Füge in folgenden Next.js Code die Komponente <AffiliateBox /> ein (importiere sie aus '@/components/AffiliateBox'). Antworte NUR mit dem vollständigen, gültigen Code ohne Markdown-Blöcke oder Erklärungen.\n\n${code};

    try {
      const response = await openai.chat.completions.create({
        model: 'qwen2.5-coder-7b-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
      });

      let updatedCode = response.choices[0].message.content.trim();
      // Falls das Modell doch Markdown-Codeblöcke mitschickt, bereinigen
      updatedCode = updatedCode.replace(/^tsx?/, '').replace(/$/, '').trim();

      fs.writeFileSync(file, updatedCode, 'utf8');
      console.log(Aktualisiert: ${file});
    } catch (err) {
      console.error(Fehler bei ${file}:, err.message);
    }
  }
  console.log('Alle Seiten verarbeitet.');
}

run();