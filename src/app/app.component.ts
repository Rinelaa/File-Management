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
  
  navigateToFolder(folder: FileNode) {
    this.currentFolder = folder;
  
    // Përditëso breadcrumbPath bazuar te folder-i
    const index = this.breadcrumbPath.findIndex((f) => f.id === folder.id);
    if (index !== -1) {
      this.breadcrumbPath = this.breadcrumbPath.slice(0, index + 1);
    } else {
      this.breadcrumbPath.push(folder);
    }
    console.log('Updated Breadcrumb Path:', this.breadcrumbPath);
  }
}