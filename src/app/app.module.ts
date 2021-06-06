import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRouterModule} from "./modules/app-router.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material.module";
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "./services/interceptor.service";
import { HomeComponent } from './components/home/home.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import {AuthInterceptor} from "./services/auth.interceptor";
import {DeleteProjectDialog, ProjectsComponent} from './components/projects/projects.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import {DeleteUserFromProject, ProjectUsersComponent} from './components/project-users/project-users.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component';
import { EditTaskDialogComponent } from './components/edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './components/delete-task-dialog/delete-task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    ProjectsComponent,
    NewProjectComponent,
    ProjectPageComponent,
    NewTaskComponent,
    DeleteUserDialogComponent,
    ProjectUsersComponent,
    UserTasksComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    DeleteProjectDialog,
    DeleteUserFromProject
  ],
    imports: [
        BrowserModule,
        AppRouterModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
