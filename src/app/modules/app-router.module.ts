import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {SignupComponent} from "../components/signup/signup.component";
import {HomeComponent} from "../components/home/home.component";
import {AuthGuard} from "../services/auth.guard";
import {ForbiddenComponent} from "../components/forbidden/forbidden.component";
import {AdminPanelComponent} from "../components/admin-panel/admin-panel.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard],data:{permittedRoles:['User','Manager','Admin']}},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'home/admin-panel',component:AdminPanelComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin']}},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'**',redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {
}
