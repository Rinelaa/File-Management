import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FolderService } from 'src/app/services/folder.service';
import { FileNode } from 'src/app/models/file-node';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-folder-structure',
  templateUrl: './folder-structure.component.html',
  styleUrls: ['./folder-structure.component.css'],
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule] 
})
export class FolderStructureComponent implements OnInit {
  @Input() nodes: FileNode[] = [];

  @Output() nodeSelected = new EventEmitter<FileNode>();

  @Output() folderRenamed = new EventEmitter<FileNode>();
@Output() folderDeleted = new EventEmitter<FileNode>();

updateFolder(folder: FileNode) {
  this.folderRenamed.emit(folder);
}

deleteFolder(folder: FileNode) {
  this.folderDeleted.emit(folder);
}
  
  treeControl: FlatTreeControl<FileNode>;
  treeFlattener: MatTreeFlattener<FileNode, any>;
  dataSource: MatTreeFlatDataSource<FileNode, any>;

  constructor(private folderService: FolderService) {
    this.treeFlattener = new MatTreeFlattener <FileNode, FileNode>(
      (node: FileNode, level: number) => ({
        ...node,
        level: level,
        expandable: node.type === 'folder' && node.children && node.children.length > 0,
      }),
      (node) => node.level || 0,
      (node) => node.expandable ||false ,
      (node) => node.children || []
    );


    this.treeControl = new FlatTreeControl<FileNode>(
      (node) => node.level || 0,
      (node) => node.expandable ||false
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  ngOnInit() {
    this.folderService.getFolders().subscribe((folders) => {
      console.log('Received folders:', folders);
      this.dataSource.data = folders;
      console.log('DataSource:', this.dataSource.data);
    });
  }

  hasChild = (_: number, node: FileNode) => node.type === 'folder';

onNodeClick(node: FileNode) {
  console.log('Node clicked:', node); // Debug
  this.nodeSelected.emit(node);
}
}


