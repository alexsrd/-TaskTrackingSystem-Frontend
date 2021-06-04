import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Task} from "../../models/task";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'progress','fullName'];

  dataSource!: MatTableDataSource<Task>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  progresses:string[] = ['Not Assigned','Assigned','In Progress','Done'];

  tasks?:Task[];
  id?:number;

  constructor(private route:ActivatedRoute,
              private taskService:TaskService,
              private snackBar:SnackBarService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTasksByProjectId(this.id);
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },1000);
  }

  getTasksByProjectId(id:number)
  {
    this.taskService.getUserTasksOnProject(id).subscribe((data:Task[])=>{
      this.tasks = data;
      this.dataSource = new MatTableDataSource(this.tasks);
      console.log(this.tasks);
    });
  }

  changeProgress(task:Task)
  {
    this.taskService.updateTask(task).subscribe(()=>{
      this.snackBar.showMessage("Progress was changed successfully");
      this.ngOnInit();
      this.ngAfterViewInit();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
