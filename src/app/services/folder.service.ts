import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileNode } from '../models/file-node';


@Injectable({
  providedIn: 'root',
})
export class FolderService {
  private apiUrl = 'http://localhost:3000/folders';

  constructor(private http: HttpClient) {}

  getFolders(): Observable<FileNode[]> {
    return this.http.get<FileNode[]>(this.apiUrl);
  }

  createFolder(parentId: number, folder: Partial<FileNode>): Observable<FileNode> {
    return this.http.post<FileNode>(`${this.apiUrl}/${parentId}/children`, folder);
  }

  updateFolder(folderId: number, updatedFolder: Partial<FileNode>): Observable<FileNode> {
    return this.http.patch<FileNode>(`${this.apiUrl}/${folderId}`, updatedFolder);
  }

  deleteFolder(folderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${folderId}`);
  }
  
  

}
