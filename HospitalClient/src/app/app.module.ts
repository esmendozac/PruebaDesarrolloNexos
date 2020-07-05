import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetPacientesComponent } from './componentes/get-pacientes/get-pacientes.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { PacientesService } from "./servicios/pacientes.service"
import { HttpClientModule} from "@angular/common/http";
import { GetDoctoresComponent } from './componentes/get-doctores/get-doctores.component';
import { EditPacientesComponent } from './componentes/edit-pacientes/edit-pacientes.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    GetPacientesComponent,
    NavegacionComponent,
    GetDoctoresComponent,
    EditPacientesComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [PacientesService],
  bootstrap: [NavegacionComponent]
})
export class AppModule { }
