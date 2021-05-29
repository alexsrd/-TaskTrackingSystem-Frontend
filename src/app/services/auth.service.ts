import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterModel} from "../models/register-model";
import {GlobalConstants} from "../global-constants";
import {Observable} from "rxjs";
import {LoginModel} from "../models/login-model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authorized:boolean = false;
  constructor(private http: HttpClient,private router:Router) {
  }

  register(user: RegisterModel): Observable<any> {
    return this.http.post(GlobalConstants.API_URL + '/auth/register', user);
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post(GlobalConstants.API_URL + '/auth/login', user);
  }

  logout(){
    localStorage.clear();
    this.authorized = false;
    this.router.navigateByUrl('/login');
  }

  isAuthorized(roles:Array<string>) : boolean
  {
    if (localStorage.getItem("token") != null) {
      if(roles && this.roleMatch(roles)) this.authorized = true;
    }
    return this.authorized;
  }

  roleMatch(roles:Array<string>):boolean
  {
    let isMatch = false;
    const token = localStorage.getItem("token") ?? '';
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    const userRole = payload.Role;
    roles.forEach(elem=>{
      if(elem == userRole)
        isMatch = true;
        return false;
    })
    return isMatch;
  }

}
