export interface FileNode {
  id: number;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  children?: FileNode[];
  level?: number;
  status?: string; // Status është opsional
  dateModified?: string; 
  expandable?: boolean; // Shtohet këtu
}
