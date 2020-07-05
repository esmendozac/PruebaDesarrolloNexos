using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiREST.Modelos
{
    public class Paciente
    {
        [Key]
        public int IdPaciente { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }    
        public string IdSeguridadSocial { get; set; }
        public string CodigoPostal { get; set; }
        public string NumeroContacto { get; set; }
        public DateTime Creado { get; set; }
        public List<PacienteDoctor> PacientesDoctores { get; set; }
    }
}
