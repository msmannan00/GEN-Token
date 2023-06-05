import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { LoginComponent } from './login/login.component';
import { ChildComponent } from './child/child.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: ParentComponent },
  { path: 'child/:parentId', component: ChildComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
