import { Injectable } from '@angular/core';
import {GlobalConstants} from "../global-constants";
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getProjectTasks(id:number):Observable<Task[]>
  {
    return this.http.get<Task[]>(GlobalConstants.API_URL + '/tasks/'+id);
  }

  addProjectTask(id:number,task:Task):Observable<Task>
  {
    return this.http.post<Task>(GlobalConstants.API_URL + '/tasks/'+id,task);
  }
}
