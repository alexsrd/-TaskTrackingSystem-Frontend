import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {Router} from "@angular/router";
import {UserProfile} from "../../models/user-profile";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent {

  project!:Project;
  formModel!:FormGroup;

  constructor(private fb:FormBuilder,
              private projectService:ProjectService,
              private snackBar:SnackBarService,
              private router:Router) {
    this.project = new Project();
    this.project.users = [];

    this.formModel = this.fb.group({
      Name : new FormControl('', [Validators.required]),
      Email : new FormControl('', [Validators.required,Validators.email])
    });
  }

  onSubmit()
  {
    this.project.name = this.formModel.controls["Name"].value;
    this.createProject(this.project);
  }

  createProject(project:Project)
  {
    this.projectService.createProject(project).subscribe(()=>{
      this.snackBar.showMessage("Project was created successfuly");
      this.router.navigateByUrl("/projects")
    });
  }

  addUserViaEmail()
  {
    this.formModel.markAsUntouched();
    let userEmail:string = this.formModel.controls['Email'].value;

    if(this.formModel.controls['Email'].valid && userEmail!=null)
    {
      this.project.users?.push(new UserProfile('','',userEmail));
    }
  }

  getNameErrorMessage() {
    if (this.formModel.controls['Name'].hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  getEmailErrorMessage() {
    if (this.formModel.controls['Email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.formModel.controls['Email'].hasError('email') ? 'Not a valid email' : '';
  }

}
