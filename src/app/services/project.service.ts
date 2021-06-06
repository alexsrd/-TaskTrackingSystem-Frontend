import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project";
import {GlobalConstants} from "../global-constants";
import {UserProfile} from "../models/user-profile";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  createProject(project:Project)
  {
    return this.http.post(GlobalConstants.API_URL+'/projects',project);
  }

  getUserProjects()
  {
    return this.http.get<Project[]>(GlobalConstants.API_URL+'/projects');
  }

  getProject(id:number)
  {
    return this.http.get<Project>(GlobalConstants.API_URL+'/projects/'+id);
  }

  deleteProject(id: number | undefined)
  {
    return this.http.delete<Project>(GlobalConstants.API_URL+'/projects/'+id);
  }

  deleteUserFromProject(projectId:number,email:string)
  {
    return this.http.delete(GlobalConstants.API_URL+'/projects/deleteFromProject/'+projectId+'&'+email)
  }

}
