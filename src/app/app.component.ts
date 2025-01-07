import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule

import { FileNode } from './models/file-node';
import { FolderService } from './services/folder.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FolderGridComponent } from './components/folder-grid/folder-grid.component';
import { FolderStructureComponent } from './components/folder-structure/folder-structure.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule,BreadcrumbComponent, FolderGridComponent, FolderStructureComponent, CommonModule,]
  
  
})
export class AppComponent implements OnInit {
 
  
  @Input() sampleNodes: FileNode[] = [];

  
  breadcrumbPath: FileNode[] = []; // Rruga aktuale në breadcrumb
  currentFolder: FileNode | null = null; // Folderi aktual që po shfaqet

  constructor(private folderService: FolderService) {}

  ngOnInit() {
    this.folderService.getFolders().subscribe((data: FileNode[]) => {
      console.log('Përgjigjja nga API-ja:', data);
      this.sampleNodes = data;
      // Kontrollo nëse data.folders ekziston dhe caktoje
      if (this.sampleNodes.length > 0) {
        this.currentFolder = this.sampleNodes[0]; // Fillo me folderin kryesor
        this.breadcrumbPath = [this.currentFolder]; // Inicializo rrugën e breadcrumb
        console.log('Initialized Breadcrumb Path:', this.breadcrumbPath); // Debug
      }
    });
  }
  
  navigateToFolderOrFile(item: FileNode): void {
    if (item.type === 'folder') {
      // Kur klikohet një folder, zëvendëso gjithçka pas RootFolder-it dhe subfolder-it të selektuar
      this.breadcrumbPath = [this.sampleNodes[0], item];
      this.currentFolder = item; // Përditëso currentFolder për të shfaqur përmbajtjen e tij
    } else if (item.type === 'file') {
      // Kur klikohet një file, shto file-in pas subfolder-it aktual në breadcrumb
      if (this.breadcrumbPath.length === 2) {
        this.breadcrumbPath[1] = this.currentFolder!;
      }
      this.breadcrumbPath[2] = item; // Shto file-in si element i fundit në breadcrumb
    }
    console.log('Updated Breadcrumb Path:', this.breadcrumbPath);
  }


  // Krijimi i një elementi të ri (file ose folder)
  // Krijimi i një elementi të ri (file ose folder)
// createNewItem(parent: FileNode): void {
//   const name = prompt('Enter the name for the new item:');
//   const type = confirm('Is this a folder? OK for Folder, Cancel for File') ? 'folder' : 'file';

//   if (name) {
//     const newItem: Partial<FileNode> = { name, type, children: type === 'folder' ? [] : undefined };
//     this.folderService.createItem(parent.id, newItem).subscribe({
//       next: (createdItem) => {
//         parent.children = parent.children || [];
//         parent.children.push(createdItem);
//         console.log('Item created successfully:', createdItem);
//       },
//       error: (err) => console.error('Error creating item:', err),
//     });
//   }
// }

createNewItem(parent: FileNode): void {
  const name = prompt('Enter the name for the new item:');
  const type = confirm('Is this a folder? OK for Folder, Cancel for File') ? 'folder' : 'file';

  if (name) {
    const newItem: Partial<FileNode> = {
      name,
      type,
      children: type === 'folder' ? [] : undefined,
      parentId: parent.id, // Add parentId to associate the item
    };

    this.folderService.createItem(parent.id, newItem).subscribe({
      next: (createdItem) => {
        parent.children = parent.children || [];
        parent.children.push(createdItem);
        console.log('Item created successfully:', createdItem);
      },
      error: (err) => console.error('Error creating item:', err),
    });
  }
}




// Ndryshimi i emrit të një elementi ekzistues
renameItem(id: number, newName: string): void {
  if (!newName.trim()) {
    console.error("Emri i ri nuk mund të jetë bosh.");
    return;
  }

  const folder = this.sampleNodes.find(f => f.id === id); // Gjej folderin përkatës

  if (folder) {
    const parentId = folder.parentId ?? 0; // Përdor 0 si default nëse parentId mungon

    this.folderService.updateItem(parentId, { id, name: newName }).subscribe({
      next: (updatedFolder) => {
        console.log(`Folderi u riemërua me sukses: ${updatedFolder.name}`);
        folder.name = updatedFolder.name; // Përditëso emrin në front-end
        folder.newName = ''; // Pastro fushën e inputit
      },
      error: (error) => {
        console.error("Gabim gjatë riemërimit:", error);
      },
    });
  }
}




// Fshirja e një elementi
deleteItem(item: FileNode, parent: FileNode | null): void {
  const confirmDelete = confirm(`Are you sure you want to delete "${item.name}"?`);
  if (confirmDelete) {
    this.folderService.deleteItem(item.id).subscribe({
      next: () => {
        if (parent && parent.children) {
          parent.children = parent.children.filter((child) => child.id !== item.id);
        }
        console.log('Item deleted successfully:', item);
      },
      error: (err) => console.error('Error deleting item:', err),
    });
  }
}
}
