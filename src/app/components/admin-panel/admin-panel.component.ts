import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserProfileService} from "../../services/user-profile.service";
import {UserProfile} from "../../models/user-profile";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = ['name', 'surname', 'email', 'role'];

  dataSource!: MatTableDataSource<UserProfile>;
  userProfiles:UserProfile[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roles:string[] = ["User","Manager","Admin"]

  constructor(private userService: UserProfileService,private snackBar:SnackBarService) {
  }

  ngOnInit(): void {
    this.getUserProfiles();
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },1000);
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

}
