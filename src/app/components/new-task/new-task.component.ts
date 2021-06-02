import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../models/task";
import {TaskService} from "../../services/task.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProfile} from "../../models/user-profile";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  filteredOptions!: Observable<(string|undefined)[]>;

  task!:Task;
  id!:number;
  formModel!:FormGroup;
  projectUsers!:UserProfile[];
  userEmails!:(string | undefined)[];

  constructor(private route:ActivatedRoute,
              private router:Router,
              private taskService:TaskService,
              private userService:UserService,
              private snackBar:SnackBarService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProjectUsers();
    this.task = new Task();
    this.formModel = this.fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      StartDate: ["", Validators.required],
      EndDate:["", Validators.required],
      Email:["",Validators.email]
    });

    this.filteredOptions = this.formModel.controls['Email'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getProjectUsers()
  {
    this.userService.getProjectUsers(this.id).subscribe((users:UserProfile[])=>{
      this.projectUsers = users;
      this.userEmails = users.map(u=>u.email);
    })
  }

  addProjectTask()
  {
    this.taskService.addProjectTask(this.id,this.task).subscribe(()=>{
      this.snackBar.showMessage(`Task ${this.task.name} was successfully added `);
      this.router.navigateByUrl('home/project-page/'+this.id);
    })
  }

  onSubmit()
  {
    this.task.name = this.formModel.controls['Name'].value;
    this.task.description = this.formModel.controls['Description'].value;
    this.task.startDate = this.formModel.controls['StartDate'].value;
    this.task.endDate = this.formModel.controls['EndDate'].value;
    this.task.user=new UserProfile('','',this.formModel.controls['Email'].value);
    this.addProjectTask();
  }

  getErrorMessage(control:string):string
  {
    let password = this.formModel.controls[control];
    if(password.hasError('required')){
      return  'You must enter a value';
    }
    return '';
  }


  private _filter(value: string): (string | undefined)[] {
    const filterValue = value.toLowerCase();

    return this.userEmails?.filter(option => option?.toLowerCase().includes(filterValue))
  }

}
