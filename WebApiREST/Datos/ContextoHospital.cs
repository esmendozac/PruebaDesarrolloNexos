using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiREST.Modelos;
using Microsoft.Extensions.Configuration;



namespace WebApiREST.Datos
{
    public class ContextoHospital : DbContext
    {

        public ContextoHospital(DbContextOptions<ContextoHospital> opts) : base(opts)
        {

        }

        public ContextoHospital()
        {

        }

        //Creación de los dbset para el mapeo de la base datos
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Doctor> Doctores { get; set; }
        public DbSet<PacienteDoctor> PacientesDoctores { get; set; }

    }
}
