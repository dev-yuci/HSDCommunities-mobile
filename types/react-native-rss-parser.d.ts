declare module 'react-native-rss-parser' {
  export function parse(text: string): Promise<{
    title: string;
    links: Array<{url: string}>;
    description: string;
    lastUpdated: string;
    items: Array<{
      title: string;
      links: Array<{url: string}>;
      description: string;
      published: string;
      content: string;
      authors: Array<{name: string}>;
      categories: string[];
      id: string;
    }>
  }>;
} 