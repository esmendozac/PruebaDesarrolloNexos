using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http2;
using Microsoft.EntityFrameworkCore;
using WebApiREST.Datos;
using WebApiREST.Modelos;


namespace WebApiREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctoresController : ControllerBase, IDisposable
    {
        //Data context del controller
        private readonly ContextoHospital contexto;

        //Inyección de dependencias de el datacontext al constructor
        public DoctoresController(ContextoHospital contexto)
        {
            this.contexto = contexto;
        }

        //Al finalizar las operación libera recursos
        public void Dispose()
        {
            this.contexto.Dispose();
        }

        //Operaciones de CRUD

        /// <summary>
        /// El end point retorna todos los registros de los doctores existentes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetDoctores()
        {

            //Consulta todos los registros de la tabla
            var doctores = this.contexto.Doctores.Include(p => p.PacientesDoctores).Select(d => new { 
                d.IdDoctor,
                d.Nombres,
                d.Apellidos,
                d.Creado,
                d.Credencial,
                d.Especialidad,
                d.Hospital,
                PacientesDoctores = d.PacientesDoctores.Select(pd => new {
                    pd.IdPaciente,
                    pd.IdDoctor,
                    pd.IdPacienteDoctor,
                    pd.Paciente
                })
            }).ToArray();

            return Ok(doctores);
        }

        /// <summary>
        /// El end point retorna unicamente un registro segun se le indique
        /// </summary>
        /// <param name="idDoctor"></param>
        /// <returns></returns>
        [HttpGet("{idDoctor}")]
        public ActionResult GetDoctor(int idDoctor)
        {

            //Consulta el doctores
            Doctor Doctor = this.contexto.Doctores.Find(idDoctor);

            if (Doctor == null)
                return NotFound($"No se hallaron registros para el id {idDoctor}");


            return Ok(Doctor);
        }


        [HttpPost]
        public ActionResult<Doctor> PostDoctor(Doctor Doctor)
        {
            //Añade una fecha de creación
            Doctor.Creado = DateTime.Now;

            try
            {
                //Crea el registro en la base de datos
                this.contexto.Add(Doctor);

                this.contexto.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo crear el registro", ex);
            }


            //Retorna el Doctor con el Id actualizado
            return Ok(Doctor);
        }

        [HttpPut("{idDoctor}")]
        public ActionResult<Doctor> PutDoctor(int idDoctor, Doctor Doctor)
        {

            //Si los ids no son iguales la petición es incorrecta
            if (idDoctor == Doctor.IdDoctor)
            {
                //Actualiza el registro 
                this.contexto.Entry<Doctor>(Doctor).State = EntityState.Modified;

                //Almacena los cambios
                try
                {
                     contexto.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception("No se pudo actualizar el objeto", ex);
                }
            }

            return NoContent();
        }

        [HttpDelete("{idDoctor}")]
        public ActionResult DeleteDoctor(int idDoctor)
        {
            //Consulta el registro a borrar 
            Doctor Doctor = this.contexto.Doctores.Find(idDoctor);

            if (Doctor == null)
                return NotFound();

            this.contexto.Doctores.Remove(Doctor);

            this.contexto.SaveChanges();

            return Ok();
        }
    }
}
