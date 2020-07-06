import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetPacientesComponent } from './componentes/get-pacientes/get-pacientes.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { PacientesService } from "./servicios/pacientes.service"
import { DoctoresService } from "./servicios/doctores.service"

import { HttpClientModule} from "@angular/common/http";
import { GetDoctoresComponent } from './componentes/get-doctores/get-doctores.component';
import { EditPacientesComponent } from './componentes/edit-pacientes/edit-pacientes.component';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { EditDoctoresComponent } from './componentes/edit-doctores/edit-doctores.component';
import { _ } from "underscore";

@NgModule({
  declarations: [
    GetPacientesComponent,
    NavegacionComponent,
    GetDoctoresComponent,
    EditPacientesComponent,
    EditDoctoresComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [PacientesService, DoctoresService],
  bootstrap: [NavegacionComponent]
})
export class AppModule { }
