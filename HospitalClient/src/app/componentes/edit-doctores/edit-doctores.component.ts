import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/modelos/Doctor';
//Servicios de negocio
import {DoctoresService} from "../../servicios/doctores.service";

@Component({
  selector: 'app-edit-doctores',
  templateUrl: './edit-doctores.component.html',
  styleUrls: ['./edit-doctores.component.css']
})
export class EditDoctoresComponent implements OnInit {

  constructor(private route: ActivatedRoute, private doctoresService: DoctoresService, private router: Router) { }

  //Configuraciones locales para el formulario
  config = {
    modo :"create",
    id : null,
    subscriber :null    
  }

  doctor : Doctor;

  //Instancia del formulario
  doctorForm = new FormGroup({
    apellidos         : new FormControl('', Validators.required),
    nombres           : new FormControl('', Validators.required),
    especialidad      : new FormControl('', Validators.required),
    credencial        : new FormControl('', Validators.required),
    hospital          : new FormControl('', Validators.required)
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

      //Consulta el doctor
      this.doctoresService.getDoctor(id).subscribe(d =>this.mapearDoctor(d));
    }
    this.config.id = id;
  }
    
  //Recibe el doctor consultado y lo mapea en el formulario
  mapearDoctor(doctor : Doctor) : void {

    this.doctor = doctor;

    this.doctorForm.controls["apellidos"].setValue(doctor.apellidos);
    this.doctorForm.controls["nombres"].setValue(doctor.nombres);
    this.doctorForm.controls["especialidad"].setValue(doctor.especialidad);
    this.doctorForm.controls["credencial"].setValue(doctor.credencial);
    this.doctorForm.controls["hospital"].setValue(doctor.hospital);
  }
  
  //Cuando el usuario realiza el submit de un formulario
  onSubmitFormulario() : void {

    //Petición POST
    if(this.config.modo == "Crear"){

      //Mapea el formulario en un modelo de doctor
      this.doctor = this.doctorForm.getRawValue();
      this.doctoresService.postDoctor(this.doctor).subscribe(d => this.volverDoctores(), error => console.log(error));     
    }
    //Petición PUT
    else if(this.config.modo == "Editar"){
      
      //Extrae la información del formulario y la envía al servidor para editarla
      let doctorForm = this.doctorForm.getRawValue();

      let flagCambios = false;

      //Actualización de los parametros en el modelo principal desde el form
      if(this.doctor.apellidos != doctorForm.apellidos){
        this.doctor.apellidos = doctorForm.apellidos;
        flagCambios = true;
      }
      if(this.doctor.nombres != doctorForm.nombres){
        this.doctor.nombres = doctorForm.nombres;
        flagCambios = true;
      }
      if(this.doctor.credencial != doctorForm.credencial){
        this.doctor.credencial = doctorForm.credencial;
        flagCambios = true;
      }
      if(this.doctor.especialidad != doctorForm.especialidad){
        this.doctor.especialidad = doctorForm.especialidad;
        flagCambios = true;
      }
      if(this.doctor.hospital != doctorForm.hospital){
        this.doctor.hospital = doctorForm.hospital;
        flagCambios = true;
      }

      //Si hay modificaciones se ejecuta la actualización 
      if(flagCambios){
        this.doctoresService.putDoctor(this.doctor.idDoctor, this.doctor).subscribe(d => this.volverDoctores(), error => console.log(error));
      }
      //Si no retorna a la lista principal
      else{
        this.volverDoctores();
      }
    }
  }

  //Vuelve a la vista principal
  volverDoctores() : void{
    this.router.navigate(['doctores']);
  }

}
