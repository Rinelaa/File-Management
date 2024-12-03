export interface FileNode {
  id: number;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  children?: FileNode[];
  level?: number;
  expandable?: boolean; // Shtohet këtu
}
