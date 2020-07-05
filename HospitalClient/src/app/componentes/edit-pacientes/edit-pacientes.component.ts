import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/modelos/Paciente';
//Servicios de negocio
import {PacientesService} from "../../servicios/pacientes.service";


@Component({
  selector: 'app-edit-pacientes',
  templateUrl: './edit-pacientes.component.html',
  styleUrls: ['./edit-pacientes.component.css']
})
export class EditPacientesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private pacientesService: PacientesService, private router: Router) { }

  //Configuraciones locales para el formulario
  config = {
    modo :"create",
    id : null,
    subscriber :null    
  }

  paciente : Paciente;

  //Instancia del formulario
  pacienteForm = new FormGroup({
    apellidos         : new FormControl('', Validators.required),
    nombres           : new FormControl('', Validators.required),
    idSeguridadSocial : new FormControl('', Validators.required),
    codigoPostal      : new FormControl('', Validators.required),
    numeroContacto    : new FormControl('', Validators.required)
  });

  ngOnInit(): void {

      //Lectura del routeParams
     this.config.subscriber = this.route.params.subscribe(params => this.inicializarFormulario( params['id']));

  }

  //Liberación de los observables
  ngOnDestroy() {
    
    if(this.config.subscriber)    
      this.config.subscriber.unsubscribe();
  }

  //Ejecutada por el lamba del subscriber del routeParams
  inicializarFormulario(id: number) : void{
    if (id == 0)
      this.config.modo = "Crear";
    else {

      this.config.modo = "Editar";

      //Consulta el paciente
      this.pacientesService.getPaciente(id).subscribe(d =>this.mapearPaciente(d));
    }
    this.config.id = id;
  }
    
  //Recibe el paciente consultado y lo mapea en el formulario
  mapearPaciente(paciente : Paciente) : void {

    this.paciente = paciente;

    this.pacienteForm.controls["apellidos"].setValue(paciente.apellidos);
    this.pacienteForm.controls["nombres"].setValue(paciente.nombres);
    this.pacienteForm.controls["idSeguridadSocial"].setValue(paciente.idSeguridadSocial);
    this.pacienteForm.controls["codigoPostal"].setValue(paciente.codigoPostal);
    this.pacienteForm.controls["numeroContacto"].setValue(paciente.numeroContacto);
  }
  
  //Cuando el usuario realiza el submit de un formulario
  onSubmitFormulario() : void {

    //Petición POST
    if(this.config.modo == "Crear"){

      //Mapea el formulario en un modelo de paciente
      this.paciente = this.pacienteForm.getRawValue();
      this.pacientesService.postPaciente(this.paciente).subscribe(d => this.volverPacientes(), error => console.log(error));     
    }
    //Petición PUT
    else if(this.config.modo == "Editar"){
      
      //Extrae la información del formulario y la envía al servidor para editarla
      let pacienteForm = this.pacienteForm.getRawValue();

      let flagCambios = false;

      //Actualización de los parametros en el modelo principal desde el form
      if(this.paciente.apellidos != pacienteForm.apellidos){
        this.paciente.apellidos = pacienteForm.apellidos;
        flagCambios = true;
      }
      if(this.paciente.nombres != pacienteForm.nombres){
        this.paciente.nombres = pacienteForm.nombres;
        flagCambios = true;
      }
      if(this.paciente.idSeguridadSocial != pacienteForm.idSeguridadSocial){
        this.paciente.idSeguridadSocial = pacienteForm.idSeguridadSocial;
        flagCambios = true;
      }
      if(this.paciente.codigoPostal != pacienteForm.codigoPostal){
        this.paciente.codigoPostal = pacienteForm.codigoPostal;
        flagCambios = true;
      }
      if(this.paciente.numeroContacto != pacienteForm.numeroContacto){
        this.paciente.numeroContacto = pacienteForm.numeroContacto;
        flagCambios = true;
      }

      //Si hay modificaciones se ejecuta la actualización 
      if(flagCambios){
        this.pacientesService.putPaciente(this.paciente.idPaciente, this.paciente).subscribe(d => this.volverPacientes(), error => console.log(error));
      }
      //Si no retorna a la lista principal
      else{
        this.volverPacientes()
      }
    }
  }

  //Vuelve a la vista principal
  volverPacientes() : void{
    this.router.navigate(['pacientes']);
  }
}
