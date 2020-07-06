import {PacienteDoctor} from './PacienteDoctor';

export class Doctor{

    idDoctor     : number;
    nombres      : string; 
    apellidos    : string;
    especialidad : string;
    credencial   : string;
    hospital     : string;
    creado       : Date;         
    pacientesDoctores : PacienteDoctor[];
    //De interfaz 
    seleccionado : boolean;
}