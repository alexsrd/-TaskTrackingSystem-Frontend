import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserProfile} from "../models/user-profile";
import {GlobalConstants} from "../global-constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<UserProfile[]>
  {
    return this.http.get<UserProfile[]>(GlobalConstants.API_URL+'/users');
  }

  updateUser(user:UserProfile)
  {
    return this.http.put(GlobalConstants.API_URL+'/users',user);
  }

  getProjectUsers(id:number) : Observable<UserProfile[]>
  {
    return this.http.get<UserProfile[]>(GlobalConstants.API_URL + '/users/'+id);
  }

  addUserToProject(id:number,email:string) : Observable<UserProfile>
  {
    return this.http.put(GlobalConstants.API_URL+'/users/addToProject/'+id,email);
  }
}
