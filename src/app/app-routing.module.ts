import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsEmpComponent } from './components/details-emp/details-emp.component';
import { EditEmpComponent } from './components/edit-emp/edit-emp.component';
import { AddEmpComponent } from './components/add-emp/add-emp.component';

const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'emp/:id',component:DetailsEmpComponent},
  {path:'empEdit/:id',component:EditEmpComponent},
  {path:'add',component:AddEmpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
