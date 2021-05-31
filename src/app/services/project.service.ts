import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project";
import {GlobalConstants} from "../global-constants";

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
}
