import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileNode } from 'src/app/models/file-node';

@Component({
  selector: 'app-folder-grid',
  templateUrl: './folder-grid.component.html',
  styleUrls: ['./folder-grid.component.css']
})
export class FolderGridComponent {
  @Input() folderContent: FileNode[]=[];
  @Output() folderOpened = new EventEmitter<FileNode>();

  onFolderClick(folder: FileNode){
    if(folder.type === 'folder'){
      this.folderOpened.emit(folder);
    }
  }
}
