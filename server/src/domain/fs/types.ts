type ResizingPresets = 'News' | 'Animal Gallery' | 'Animal Miniature';

export const DEFAULT_RESIZING_PRESET = {
  width: 1920,
  height: 1080,
};

export type ImageData = { name: string; base64: string };

export type Size = { width: number; height: number };

export const presetsMap: { [gender in ResizingPresets]: Size } = {
  News: {
    width: 1000,
    height: 670,
  },
  'Animal Gallery': {
    width: 1333,
    height: 1000,
  },
  // niby miniature, ale i tak musi być rozsądnej jakości żeby pokazać w lightboxie
  'Animal Miniature': {
    width: 1300,
    height: 975,
  },
};

export type SaveImageArgs = {
  subdir: string;
  name: string;
  base64Data: string;
  resizingPreset: ResizingPresets | null;
};
