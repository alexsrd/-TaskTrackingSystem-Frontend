import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProfile} from "../../models/user-profile";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Task} from "../../models/task";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {ProjectPageComponent} from "../project-page/project-page.component";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  filteredOptions!: Observable<(string|undefined)[]>;
  progresses:string[] = ['Not Assigned','Assigned','In Progress','Done'];

  formModel!:FormGroup;
  userEmails!:(string | undefined)[];
  task!:Task;
  id!:number;

  constructor(private fb:FormBuilder,
              public dialogRef: MatDialogRef<ProjectPageComponent>,
              private userService:UserService,
              @Inject(MAT_DIALOG_DATA) public data:any) {
    this.task = data.task;
    this.id = data.projectId;

    this.formModel = this.fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      StartDate: ["", Validators.required],
      EndDate:["", Validators.required],
      Progress:["",Validators.required],
      Email:["",Validators.email]
    });

    this.formModel.controls['Name'].setValue(this.task.name);
    this.formModel.controls['Description'].setValue(this.task.description);
    this.formModel.controls['StartDate'].setValue(this.task.startDate);
    this.formModel.controls['EndDate'].setValue(this.task.endDate);
    this.formModel.controls['Progress'].setValue(this.task.progress);
    this.formModel.controls['Email'].setValue(this.task.user?.email);

    this.filteredOptions = this.formModel.controls['Email'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngOnInit(): void {
    this.getProjectUsers();
  }

  getErrorMessage(control:string):string
  {
    let password = this.formModel.controls[control];
    if(password.hasError('required')){
      return  'You must enter a value';
    }
    return '';
  }

  editTask()
  {
    let task:Task ={
      id:this.task.id,
      name:this.formModel.controls["Name"].value,
      description:this.formModel.controls["Description"].value,
      startDate:this.formModel.controls["StartDate"].value,
      endDate:this.formModel.controls["EndDate"].value,
      progress:this.formModel.controls["Progress"].value,
      user:new UserProfile('','','',this.formModel.controls["Email"].value)
    }
    this.dialogRef.close(task);
  }

  getProjectUsers()
  {
    this.userService.getProjectUsers(this.id).subscribe((users:UserProfile[])=>{
      this.userEmails = users.map(u=>u.email);
    })
  }

  private _filter(value: string): (string | undefined)[] {
    const filterValue = value.toLowerCase();

    return this.userEmails?.filter(option => option?.toLowerCase().includes(filterValue))
  }

  getEmailErrorMessage(): string {
    let email = this.formModel.controls["Email"];

    if (email.hasError('required')) {
      return 'You must enter a value';
    }
    return email.hasError('email') ? 'Not a valid email' : '';
  }
}
