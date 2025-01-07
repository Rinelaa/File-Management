// export interface FileNode {
//   id: number;
//   name: string;
//   type: 'folder' | 'file';
//   size?: string;
//   children?: FileNode[];
//   level?: number;
//   status?: string; // Status është opsional
//   dateModified?: string; 
//   expandable?: boolean; // Shtohet këtu
  
// }
export interface FileNode {
  id: number;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  children?: FileNode[];
  level?: number;
  status?: string; // Optional status field
  dateModified?: string; 
  expandable?: boolean; // Whether the folder is expandable
  parentId?: number;
  newName?: string; // Optional field to associate the item with its parent
}

