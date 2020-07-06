import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componentes para las rutas
import { GetPacientesComponent } from './componentes/get-pacientes/get-pacientes.component';
import { GetDoctoresComponent } from './componentes/get-doctores/get-doctores.component';
import { EditPacientesComponent } from './componentes/edit-pacientes/edit-pacientes.component';
import { EditDoctoresComponent } from './componentes/edit-doctores/edit-doctores.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component: GetPacientesComponent 
  },
  {
    path:"pacientes",
    component: GetPacientesComponent    
  },
  {
    path: "paciente/:id",
    component : EditPacientesComponent
  },     
  {
    path:"doctores", 
    component: GetDoctoresComponent 
  },
  {
    path: "doctor/:id",
    component : EditDoctoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
