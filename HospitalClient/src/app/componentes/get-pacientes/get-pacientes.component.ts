import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Servicios de negocio
import {PacientesService} from "../../servicios/pacientes.service";
//Modelos
import { Paciente } from '../../modelos/Paciente';


@Component({
  selector: 'app-get-pacientes',
  templateUrl: './get-pacientes.component.html',
  styleUrls: ['./get-pacientes.component.css']
})
export class GetPacientesComponent implements OnInit {

  //Contenedores de datos
  pacientes : Paciente[] = [];

  constructor(private pacientesService: PacientesService, private router: Router) { }

  //Consulta de los datos de pacientes para la vista
  ngOnInit(): void {
    
    this.consultarPacientes();
  }

  //Extrae los datos del request Http y los asigna al modelo de la clase
  procesarPacientes(pacientes : Paciente[]) : void{
    
    this.pacientes = pacientes;
  }

  //Realiza la consulta de todos los pacientes 
  consultarPacientes() : void{

    this.pacientesService.getPacientes().subscribe(d =>this.procesarPacientes(d));

  }

  //Elimina un paciente en el servidor
  eliminarPaciente(id : number) : void {
    
    this.pacientesService.deletePaciente(id).subscribe(d => this.consultarPacientes() , error => console.log(error));

    //Refrecar la interfaz de usuario
  }

  //Redirige a las rutas seleccionadas 
  onEdicion(id : number) : void {
    this.router.navigate(['paciente/', id]);
  }
}
