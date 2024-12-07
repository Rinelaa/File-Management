import { Component, Input, OnInit } from '@angular/core';
import { FileNode } from './models/file-node';
import { FolderService } from './services/folder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
}