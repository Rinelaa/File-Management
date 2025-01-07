import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; 
import { provideRouter,Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { Routes } from '@angular/router';
import { FolderGridComponent } from './app/components/folder-grid/folder-grid.component';
import { FolderStructureComponent } from './app/components/folder-structure/folder-structure.component';

const routes = [
  { path: '', component: LoginComponent }, // Default route for login
  { path: 'register', component: RegisterComponent }, // Route for register
  {
    path: 'home',
    component: AppComponent,
    children: [
      { path: '', component: FolderGridComponent },  // Faqja kryesore
      { path: 'folder/:id', component: FolderStructureComponent }  // Folder specific
    ]
  },
  { path: '**', redirectTo: '' }, // Redirect unknown routes to login
];


//bootstrapApplication(AppComponent, {
  //providers: [
    //provideHttpClient(),
    //provideRouter(routes),
    //{ provide: BrowserAnimationsModule, useValue: BrowserAnimationsModule },
    //{ provide: ToastrModule.forRoot(), useValue: ToastrModule.forRoot() }
  //],
//}).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    { provide: BrowserAnimationsModule, useValue: BrowserAnimationsModule },
    { provide: ToastrModule.forRoot(), useValue: ToastrModule.forRoot() }
  ],
}) .catch((err) => console.error(err));




// Bootstrap the application using the standalone component and provide necessary modules.
//bootstrapApplication(AppComponent, {
  //providers: [
    //provideHttpClient(), AppRoutingModule
  //],
//});