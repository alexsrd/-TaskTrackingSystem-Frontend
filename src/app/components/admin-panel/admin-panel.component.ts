import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserProfile} from "../../models/user-profile";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SnackBarService} from "../../services/snack-bar.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";
import {DeleteUserDialogComponent} from "../delete-user-dialog/delete-user-dialog.component";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminPanelComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = ['name', 'surname', 'email', 'role'];
  expandedData!:UserProfile;

  dataSource!: MatTableDataSource<UserProfile>;
  userProfiles:UserProfile[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roles:string[] = ["User","Manager","Admin"]

  constructor(private userService: UserService,
              private snackBar:SnackBarService,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.getUserProfiles();
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },1500);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserProfiles() {
    this.userService.getUsers().subscribe((data: UserProfile[]) => {
      this.userProfiles = data;
      this.dataSource = new MatTableDataSource(this.userProfiles);
    })
  }

  changeRole(user:UserProfile)
  {
    this.userService.updateUser(user).subscribe(()=>{
      this.snackBar.showMessage("Role changed successfully");
      this.ngOnInit();
    })
  }

  editUser(user:UserProfile)
  {
    const dialogRef = this.dialog.open(EditUserDialogComponent,{
      data: user
    });

    dialogRef.afterClosed().subscribe((result:UserProfile) => {
      if(result != "")
      this.userService.updateUser(result).subscribe(()=>{
        this.snackBar.showMessage("User was edited successfully");
        this.ngOnInit();
      })
    });
  }

  deleteUser(user:UserProfile)
  {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);

    dialogRef.afterClosed().subscribe((result:boolean)=>{
      if(result)
      {
        this.userService.deleteUser(user).subscribe(result=>{
          this.snackBar.showMessage("User was successfully deleted");
          this.ngOnInit();
        });
      }
    });
  }

}
