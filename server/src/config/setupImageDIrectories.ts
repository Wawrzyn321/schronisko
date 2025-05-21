import * as path from 'path';
import * as fs from 'fs';

export function setupImageDirectories(localStaticFilesPath: string) {
  const ANIMALS_PATH = path.join(localStaticFilesPath, 'img/animals');
  const NEWS_PATH = path.join(localStaticFilesPath, 'img/news');
  const PAGES_PATH = path.join(localStaticFilesPath, 'img/pages');

  [ANIMALS_PATH, NEWS_PATH, PAGES_PATH].forEach(setupDirIfNotExists);
}

function setupDirIfNotExists(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}
