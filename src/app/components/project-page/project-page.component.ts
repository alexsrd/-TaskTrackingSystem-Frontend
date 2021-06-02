import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {TaskService} from "../../services/task.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Task} from "../../models/task";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'progress','fullName'];

  dataSource!: MatTableDataSource<Task>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  project?:Project;
  tasks?:Task[];
  id?:number;

  constructor(private route:ActivatedRoute,
              private projectService:ProjectService,
              private taskService:TaskService,
              private router:Router) {
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


}
