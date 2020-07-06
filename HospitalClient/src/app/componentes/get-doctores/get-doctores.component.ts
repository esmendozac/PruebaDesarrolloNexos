import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/modelos/Doctor';
//Servicios de negocio
import {DoctoresService} from "../../servicios/doctores.service";

@Component({
  selector: 'app-get-doctores',
  templateUrl: './get-doctores.component.html',
  styleUrls: ['./get-doctores.component.css']
})
export class GetDoctoresComponent implements OnInit {

   //Contenedores de datos
   doctores : Doctor[] = [];

   constructor(private doctoresService: DoctoresService, private router: Router) { }
 
   //Consulta de los datos de doctores para la vista
   ngOnInit(): void {
     
     this.consultarDoctores();
   }
 
   //Extrae los datos del request Http y los asigna al modelo de la clase
   procesarDoctores(doctores : Doctor[]) : void{
     
     this.doctores = doctores;
   }
 
   //Realiza la consulta de todos los doctores 
   consultarDoctores() : void{
 
     this.doctoresService.getDoctores().subscribe(d =>this.procesarDoctores(d));
 
   }
 
   //Elimina un doctor en el servidor
   eliminarDoctor(id : number) : void {
     
     this.doctoresService.deleteDoctor(id).subscribe(d => this.consultarDoctores() , error => console.log(error));
 
     //Refrecar la interfaz de usuario
   }
 
   //Redirige a las rutas seleccionadas 
   onEdicion(id : number) : void {
     this.router.navigate(['doctor/', id]);
   }

}
