import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FileNode } from 'src/app/models/file-node';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnChanges {
  @Input() breadcrumbPath: FileNode[] = [];
  @Output() folderSelected = new EventEmitter<FileNode>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['breadcrumbPath']) {
      console.log('Breadcrumb Path Updated:', this.breadcrumbPath); 
    }else{
      console.log('Breadcrumb Path është bosh.');
    }
    
  }

  navigateTo(node: FileNode) {
    console.log('Navigating to Node:', node); // Debug log
    this.folderSelected.emit(node);
  }
}
 