using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiREST.Modelos
{
    public class PacienteDoctor
    {
        [Key]
        public int IdPacienteDoctor { get; set; }
        public int IdDoctor { get; set; }
        public int IdPaciente { get; set; }
        public Doctor Doctor { get; set; }
        public Paciente Paciente { get; set; }
    }
}
