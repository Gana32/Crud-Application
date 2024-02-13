import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CompanyComponent } from './components/company/company.component';
import { CreatecompanyComponent } from './components/createcompany/createcompany.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdatecompanyComponent } from './components/updatecompany/updatecompany.component';

const routes: Routes = [
  {path: '', component : RegisterComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path:'company', component: CompanyComponent, canActivate:[AuthGuard]},
  {path:'create-company', component: CreatecompanyComponent, canActivate:[AuthGuard]},
  {path:'update-company/:id', component: UpdatecompanyComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
