import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {UserProfile} from "../../models/user-profile";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {SnackBarService} from "../../services/snack-bar.service";
import {DeleteProjectDialog} from "../projects/projects.component";
import {ProjectService} from "../../services/project.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.css']
})
export class ProjectUsersComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['name', 'surname', 'fullName', 'email'];
  dataSource!: MatTableDataSource<UserProfile>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredOptions!: Observable<(string|undefined)[]>;
  formModel!:FormGroup;

  projectUsers?:UserProfile[];
  projectId!:number;
  usersEmails!:(string | undefined)[];

  constructor(private userService:UserService,
              private route:ActivatedRoute,
              public auth:AuthService,
              private fb:FormBuilder,
              private snackBar:SnackBarService,
              private projectService:ProjectService,
              public dialog: MatDialog)
  {
    if(this.auth.role==='Manager')
    {
      this.displayedColumns.push('action');
    }
  }

  ngOnInit(): void {
    this.formModel = this.fb.group({
      Email:["",[Validators.email]]
    });
    this.projectId = Number(this.route.snapshot.paramMap.get("id"));
    this.getProjectUsers();
    this.getUsers();

    this.filteredOptions = this.formModel.controls['Email'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },1000);
  }

  getProjectUsers()
  {
    this.userService.getProjectUsers(this.projectId).subscribe((data:UserProfile[])=>{
      this.projectUsers = data;
      this.dataSource = new MatTableDataSource<UserProfile>(this.projectUsers);
    })
  }

  getUsers()
  {
    this.userService.getUsers().subscribe((data:UserProfile[])=>{
      this.usersEmails = data.map(u=>u.email);
    })
  }
  addUserToProject()
  {
    const email:string = this.formModel.controls['Email'].value;
    this.userService.addUserToProject(this.projectId,email).subscribe(()=>{
      this.snackBar.showMessage('User was successfully added to project');
      this.ngOnInit();
    })
  }

  deleteUserFromProject(email:string)
  {
    const dialogRef = this.dialog.open(DeleteProjectDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result===true)
      {
        this.projectService.deleteUserFromProject(this.projectId,email).subscribe(()=>{
          this.ngOnInit();
        })
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private _filter(value: string): (string | undefined)[] {
    const filterValue = value.toLowerCase();

    return this.usersEmails?.filter(option => option?.toLowerCase().includes(filterValue))
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2 mat-dialog-title>Delete Project</h2>
<mat-dialog-content class="mat-typography">
  <h4>Are you sure you want to delete this user from project?</h4>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-button [mat-dialog-close]="true">Delete</button>
</mat-dialog-actions>`,
})
export class DeleteUserFromProject {}
