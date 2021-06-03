import {UserProfile} from "./user-profile";

export class Task {
  constructor(public name?:string,
              public description?:string,
              public startDate?:string,
              public endDate?:string,
              public progress?:string,
              public user?:UserProfile) {
  }
}
