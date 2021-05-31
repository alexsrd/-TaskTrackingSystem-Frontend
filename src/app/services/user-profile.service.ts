import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserProfile} from "../models/user-profile";
import {GlobalConstants} from "../global-constants";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<UserProfile[]>
  {
    return this.http.get<UserProfile[]>(GlobalConstants.API_URL+'/user');
  }

  updateUser(user:UserProfile)
  {
    return this.http.put(GlobalConstants.API_URL+'/user',user);
  }
}
