import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {TaskService} from "../../services/task.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Task} from "../../models/task";
import {EditTaskDialogComponent} from "../edit-task-dialog/edit-task-dialog.component";
import {DeleteTaskDialogComponent} from "../delete-task-dialog/delete-task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SnackBarService} from "../../services/snack-bar.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
  animations:[
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProjectPageComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'progress','fullName'];
  expandedData!:Task;

  dataSource!: MatTableDataSource<Task>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  project?:Project;
  tasks?:Task[];
  id?:number;

  constructor(private route:ActivatedRoute,
              private projectService:ProjectService,
              private taskService:TaskService,
              private router:Router,
              private dialog:MatDialog,
              private snackBar:SnackBarService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTasksByProjectId(this.id);
    this.getProject(this.id);
  }
  ngAfterViewInit() {
    setTimeout(()=>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },1000);
  }

  getProject(id:number)
  {
    this.projectService.getProject(id).subscribe((project:Project)=>{
      this.project = project;
    })
  }

  getTasksByProjectId(id:number)
  {
    this.taskService.getProjectTasks(id).subscribe((tasks:Task[])=>{
      this.tasks = tasks;
      this.dataSource = new MatTableDataSource<Task>(this.tasks);
    })
  }

  addTask()
  {
    this.router.navigateByUrl('home/project-page/new-task/'+this.project?.id);
  }

  showProjectUsers()
  {
    this.router.navigateByUrl("home/project-page/project-users/"+this.id);
  }

  showUserTasksOnProject()
  {
    this.router.navigateByUrl("home/project-page/user-tasks/"+this.id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editTask(task:Task)
  {
    const dialogRef = this.dialog.open(EditTaskDialogComponent,{
      data: {task:task,projectId:this.id}
    });

    dialogRef.afterClosed().subscribe((result:Task) => {
      if(result != "")
        this.taskService.updateTask(result).subscribe(()=>{
          this.snackBar.showMessage("Task was edited successfully");
          this.ngOnInit();
          this.ngAfterViewInit();
        })
    });
  }

  deleteTask(task:Task)
  {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result:boolean)=>{
      if(result)
      {
        this.taskService.deleteTask(task).subscribe(result=>{
          this.snackBar.showMessage("Task was successfully deleted");
          this.ngOnInit();
        });
      }
    });
  }

}
