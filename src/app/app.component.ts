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
    this.folderService.getFolders().subscribe((data: any) => {
      console.log('Përgjigjja nga API-ja:', data);
  
      // Kontrollo nëse data.folders ekziston dhe caktoje
      if (data && data.folders && data.folders.length > 0) {
        this.sampleNodes = data.folders;
        this.currentFolder = this.sampleNodes[0]; // Root folder
        this.breadcrumbPath = [this.currentFolder];
        console.log('Sample Nodes:', this.sampleNodes);
      } else {
        console.error('Nuk ka foldera për të shfaqur');
      }
    });
  }
  
  navigateToFolder(folder: FileNode) {
    this.currentFolder = folder;
    const index = this.breadcrumbPath.indexOf(folder);
    if (index === -1) {
      this.breadcrumbPath.push(folder);
    } else {
      this.breadcrumbPath = this.breadcrumbPath.slice(0, index + 1);
    }
    console.log('Updated Breadcrumb Path:', this.breadcrumbPath); // Debug log
  }
}