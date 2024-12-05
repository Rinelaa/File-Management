import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FolderStructureComponent } from './components/folder-structure/folder-structure.component';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FolderGridComponent } from './components/folder-grid/folder-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderStructureComponent,
    BreadcrumbComponent,
    FolderGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
