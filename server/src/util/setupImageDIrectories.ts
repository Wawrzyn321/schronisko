import * as path from 'path';
import { setupDirIfNotExists } from './setupDirIfNotExists';

export function setupImageDirectories(localStaticFilesPath: string) {
  const ANIMALS_PATH = path.join(localStaticFilesPath, 'img/animals');
  const NEWS_PATH = path.join(localStaticFilesPath, 'img/news');
  const PAGES_PATH = path.join(localStaticFilesPath, 'img/pages');

  [ANIMALS_PATH, NEWS_PATH, PAGES_PATH].forEach(setupDirIfNotExists);
}
