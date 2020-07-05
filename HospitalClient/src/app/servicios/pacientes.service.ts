import { Injectable } from '@angular/core';
// Uso de Http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//Modelos
import { Paciente } from '../modelos/Paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  url : string = "http://localhost:50735/api/pacientes";

  constructor(private http : HttpClient) { }

  getPacientes () : Observable<Paciente[]>{

    return this.http
    .get<Paciente[]>(this.url)
    .pipe(catchError(this.errorHandler));
  }
  getPaciente (id : number) : Observable<Paciente>{

    return this.http
    .get<Paciente>(this.url + "/" + id)
    .pipe(catchError(this.errorHandler));
  }
  postPaciente (paciente : Paciente) : any {

    return this.http
    .post(this.url, paciente)
    .pipe(catchError(this.errorHandler));
  }
  putPaciente (id : number, paciente : Paciente) : any {

    return this.http
    .put(this.url + "/" + id, paciente)
    .pipe(catchError(this.errorHandler));
  }

  deletePaciente (id : number) : any {

    return this.http
    .delete(this.url + "/" + id)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler (error : HttpErrorResponse) {
    console.log("Error : ", error.message);
    return throwError(error.message);
  }
}
