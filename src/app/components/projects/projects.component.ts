import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects?:Project[];
  constructor(private projectService:ProjectService,
              private router:Router,
              public dialog: MatDialog,
              public auth:AuthService) {

  }

  ngOnInit(): void {
    this.getUserProjects();
  }


  getUserProjects()
  {
    this.projectService.getUserProjects().subscribe((data:Project[])=>{
      this.projects = data;
    })
  }

  openProjectPage(project:Project)
  {
    this.router.navigateByUrl('/home/project-page/'+project.id);
  }

  deleteProject(project:Project)
  {
    const dialogRef = this.dialog.open(DeleteProjectDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result===true)
      {
        this.projectService.deleteProject(project.id).subscribe(()=>{
          this.ngOnInit();
        })
      }
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2 mat-dialog-title>Delete Project</h2>
<mat-dialog-content class="mat-typography">
  <h4>Are you sure you want to delete project?</h4>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-button [mat-dialog-close]="true">Delete</button>
</mat-dialog-actions>`,
})
export class DeleteProjectDialog {}
