import {PacienteDoctor} from './PacienteDoctor';

export class Paciente{

    idPaciente        : number;
    nombres           : string; 
    apellidos         : string;
    idSeguridadSocial : string;
    codigoPostal      : string;
    numeroContacto    : string;
    creado            : Date;
    pacientesDoctores : PacienteDoctor[];   

}