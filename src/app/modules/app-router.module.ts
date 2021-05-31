import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {SignupComponent} from "../components/signup/signup.component";
import {HomeComponent} from "../components/home/home.component";
import {AuthGuard} from "../services/auth.guard";
import {ForbiddenComponent} from "../components/forbidden/forbidden.component";
import {AdminPanelComponent} from "../components/admin-panel/admin-panel.component";
import {ProjectsComponent} from "../components/projects/projects.component";
import {NewProjectComponent} from "../components/new-project/new-project.component";
import {ProjectPageComponent} from "../components/project-page/project-page.component";
import {NewTaskComponent} from "../components/new-task/new-task.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard],data:{permittedRoles:['User','Manager','Admin']}},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'home/admin-panel',component:AdminPanelComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin']}},
  {path:'home/projects',component:ProjectsComponent,canActivate:[AuthGuard],data:{permittedRoles:['User','Manager','Admin']}},
  {path:'home/new-project',component:NewProjectComponent,canActivate:[AuthGuard],data:{permittedRoles:['Manager']}},
  {path:'home/project-page/:id',component:ProjectPageComponent,canActivate:[AuthGuard],data:{permittedRoles:['User,Manager']}},
  {path:'home/project-page/new-task/:id',component:NewTaskComponent,canActivate:[AuthGuard],data:{permittedRoles:['User,Manager']}},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'**',redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {
}
