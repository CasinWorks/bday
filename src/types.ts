export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  badge?: string;
  date?: string;
}

export interface LetterMessage {
  id: string;
  sender: string;
  roleOrNote?: string;
  content: string;
  avatarEmoji: string;
  envelopeColor: {
    base: string;
    flap: string;
    accent: string;
    border: string;
    seal: string;
  };
  sealText: string;
  stampEmoji: string;
}

export type ActiveSection = 'hero' | 'gallery' | 'age' | 'messages' | 'closing';
