import { Injectable } from '@angular/core';
// Uso de Http
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//Modelos
import { Doctor } from '../modelos/Doctor';


@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  url : string = "http://localhost:50735/api/doctores";

  constructor(private http : HttpClient) { }

  getDoctores () : Observable<Doctor[]>{

    return this.http
    .get<Doctor[]>(this.url)
    .pipe(catchError(this.errorHandler));
  }
  getDoctor (id : number) : Observable<Doctor>{

    return this.http
    .get<Doctor>(this.url + "/" + id)
    .pipe(catchError(this.errorHandler));
  }
  postDoctor (doctor : Doctor) : any {

    return this.http
    .post(this.url, doctor)
    .pipe(catchError(this.errorHandler));
  }
  putDoctor (id : number, doctor : Doctor) : any {

    return this.http
    .put(this.url + "/" + id, doctor)
    .pipe(catchError(this.errorHandler));
  }

  deleteDoctor (id : number) : any {

    return this.http
    .delete(this.url + "/" + id)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler (error : HttpErrorResponse) {
    console.log("Error : ", error.message);
    return throwError(error.message);
  }
}
