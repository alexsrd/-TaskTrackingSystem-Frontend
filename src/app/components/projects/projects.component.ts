import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects?:Project[];
  constructor(private projectService:ProjectService) {

  }

  ngOnInit(): void {
    this.getUserProjects();
  }


  getUserProjects()
  {
    this.projectService.getUserProjects().subscribe((data:Project[])=>{
      this.projects = data;
      console.log(data);
    })
  }

}
