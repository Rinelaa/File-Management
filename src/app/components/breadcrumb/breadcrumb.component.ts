import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileNode } from 'src/app/models/file-node';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  @Input() breadcrumbPath: FileNode[] = [];
  @Output() folderSelected = new EventEmitter<FileNode>();

  onFolderClick(folder: FileNode ,index:number) :void {
    this.breadcrumbPath = this.breadcrumbPath.slice(0, index + 1);
    this.folderSelected.emit(folder);
  }
}
