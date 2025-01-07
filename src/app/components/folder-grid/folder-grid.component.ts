import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileNode } from 'src/app/models/file-node';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder-grid',
  templateUrl: './folder-grid.component.html',
  imports: [CommonModule], 
  styleUrls: ['./folder-grid.component.css'],
  standalone: true
})
export class FolderGridComponent {
  @Input() folderContent: FileNode[]=[];
  @Input() parentFolder!: FileNode;
  @Output() folderOpened = new EventEmitter<FileNode>();
  @Output() folderRenamed = new EventEmitter<FileNode>();
  @Output() folderDeleted = new EventEmitter<FileNode>();
  @Output() createFolderRequested= new EventEmitter<FileNode>();


  onFolderClick(folder: FileNode){
    if(folder.type === 'folder'){
      this.folderOpened.emit(folder);
    }
  }
  getStatus(node:FileNode): string{
    return node.status || 'Available';
  }

  getDateModified(node:FileNode): string{
    return node.dateModified || 'N/A';
  }

  requestCreateNewFolder() {
    this.createFolderRequested.emit(this.parentFolder); // Emito kërkesën me parentFolder
  }

  updateFolder(folder: FileNode) {
    this.folderRenamed.emit(folder);
  }
  
  deleteFolder(folder: FileNode) {
    this.folderDeleted.emit(folder);
  }
}
