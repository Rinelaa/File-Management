import { Observable } from "rxjs";
import { FileNode } from "../models/file-node";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  private apiUrl = 'http://localhost:3000/folders';

  constructor(private http: HttpClient) {}

  getFolders(): Observable<FileNode[]> {
    return this.http.get<FileNode[]>(this.apiUrl);
  }

  createItem(parentId: number, item: Partial<FileNode>): Observable<FileNode> {
    // Ensure the parentId is included in the item being created
    const newItem = { ...item, parentId };
  
    // Send the POST request to the root folder endpoint
    return this.http.post<FileNode>(`${this.apiUrl}`, newItem);
  }
  

/*updateItem(id: number, updatedItem: FileNode): Observable<FileNode> {
   return this.http.put<FileNode>(`http://localhost:3000/folders/${id}`, updatedItem);
  }

   updateItem(id: number, newName: string): Observable<FileNode> {
    // Create a partial object with only the name field to be updated
    const updatedData = { name: newName };
  
    // Send the PATCH request to the specific folder endpoint
    return this.http.patch<FileNode>(`${this.apiUrl}/${id}`, updatedData);
  }*/
    updateItem(parentId: number, item: Partial<FileNode>): Observable<FileNode> {
      const newItem = { ...item, parentId }; // Kombinon të dhënat ekzistuese me parentId
      return this.http.patch<FileNode>(`${this.apiUrl}`, newItem); // PATCH për përditësim të pjesshëm
    }
    
  

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }

  getFolderById(folderId: number): Observable<FileNode> {
    console.log('Requesting folders from:', this.apiUrl);
    return this.http.get<FileNode>(`${this.apiUrl}/${folderId}`);
  }
}
