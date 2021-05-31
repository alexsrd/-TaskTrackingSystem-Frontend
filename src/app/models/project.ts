import {UserProfile} from "./user-profile";

export class Project {
  constructor(public id?:number,
              public name?:string,
              public createdAt?:Date,
              public users?:UserProfile[],
              public tasks?:Task[]) {
  }
}
