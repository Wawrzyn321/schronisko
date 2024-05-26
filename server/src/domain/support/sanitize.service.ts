import { Injectable } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeService {
  sanitizeHtml(html: string) {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
      allowIframeRelativeUrls: false,
    });
  }

  sanitizePlainText(html: string) {
    return sanitizeHtml(html, { allowedTags: [] });
  }
}
