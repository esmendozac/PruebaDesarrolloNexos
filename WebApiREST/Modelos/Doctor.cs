using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiREST.Modelos
{
    public class Doctor
    {
        [Key]
        public int IdDoctor { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Especialidad { get; set; }
        public string Credencial { get; set; }
        public string Hospital { get; set; }
        public DateTime Creado { get; set; }
        public List<PacienteDoctor> PacientesDoctores { get; set; }

    }
}
