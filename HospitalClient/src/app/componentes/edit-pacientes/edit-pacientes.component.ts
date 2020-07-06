import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/modelos/Paciente';
import { Doctor } from 'src/app/modelos/Doctor';


//Servicios de negocio
import {PacientesService} from "../../servicios/pacientes.service";
import {DoctoresService} from "../../servicios/doctores.service";
import { PacienteDoctor } from 'src/app/modelos/PacienteDoctor';


@Component({
  selector: 'app-edit-pacientes',
  templateUrl: './edit-pacientes.component.html',
  styleUrls: ['./edit-pacientes.component.css']
})
export class EditPacientesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private pacientesService: PacientesService, private doctoresService: DoctoresService ,private router: Router) { }

  //Configuraciones locales para el formulario
  config = {
    modo :"create",
    id : null,
    subscriber :null    
  }
   
  //Paciente a editar
  paciente : Paciente;

  //Listado de todos los doctores
  doctores : Doctor[];
  
  //Instancia del formulario
  pacienteForm = new FormGroup({
    apellidos         : new FormControl('', Validators.required),
    nombres           : new FormControl('', Validators.required),
    idSeguridadSocial : new FormControl('', Validators.required),
    codigoPostal      : new FormControl('', Validators.required),
    numeroContacto    : new FormControl('', Validators.required)
  });

  ngOnInit(): void {

    //Consulta de todos los doctores disponibles 
    this.doctoresService.getDoctores().subscribe(d => this.doctores = d);

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

    this.marcarDoctores();

  }
  
  marcarDoctores() :void{
    
    //Retorna los doctores que están actualmente asignados al paciente
    this.paciente.pacientesDoctores.forEach(pd => {
      console.log(this.doctores);
      //Busca el doctor seleccionado
      let doctor = this.doctores.find(d => d.idDoctor == pd.idDoctor);
      //Lo marca como seleccionado
      if(doctor != null)
        doctor.seleccionado = true;
    });
  }

  //Cuando el usuario realiza el submit de un formulario
  onSubmitFormulario() : void {

    //Petición POST
    if(this.config.modo == "Crear"){

      //Mapea el formulario en un modelo de paciente
      this.paciente = this.pacienteForm.getRawValue();
      this.pacientesService.postPaciente(this.paciente).subscribe(d  => this.volverPacientes(), error => console.log(error));     
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


  seleccionarDoctor(doctor : Doctor) : void{
    
    console.log("Doctor", doctor);

    //Crea el paciente doctor
    let pacientesDoctores = this.paciente.pacientesDoctores;

    if(!pacientesDoctores.find(pd => pd.idPaciente == this.paciente.idPaciente && pd.idDoctor == doctor.idDoctor )){
      //Crea y asigna el nuevo paciente doctor
      let pdNuevo : PacienteDoctor = {
        "idPacienteDoctor" : 0,
        "idDoctor" : doctor.idDoctor,
        "idPaciente" : this.paciente.idPaciente,
        "doctor" : null
      };
      
      this.paciente.pacientesDoctores.push(pdNuevo);
    }
  }

  //Vuelve a la vista principal
  volverPacientes() : void{
    this.router.navigate(['pacientes']);
  }
}
