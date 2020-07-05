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
    public class PacientesController : ControllerBase, IDisposable
    {
        //Data context del controller
        private readonly ContextoHospital contexto;

        //Inyección de dependencias de el datacontext al constructor
        public PacientesController(ContextoHospital contexto)
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
        /// El end point retorna todos los registros de pacientes existentes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<IEnumerable<Paciente>> GetPacientes()
        {

            //Consulta todos los registros de la tabla
            Paciente[] pacientes = this.contexto.Pacientes.ToArray();

            return Ok(pacientes);
        }

        /// <summary>
        /// El end point retorna unicamente un registro segun se le indique
        /// </summary>
        /// <param name="idPaciente"></param>
        /// <returns></returns>
        [HttpGet("{idPaciente}")]
        public ActionResult<Paciente> GetPaciente(int idPaciente)
        {

            //Consulta el pacientes
            Paciente paciente = this.contexto.Pacientes.Find(idPaciente);

            if (paciente == null)
                return NotFound($"No se hallaron registros para el id {idPaciente}");


            return Ok(paciente);
        }


        [HttpPost]
        public ActionResult<Paciente> PostPaciente(Paciente paciente)
        {
            //Añade una fecha de creación
            paciente.Creado = DateTime.Now;

            try
            {
                //Crea el registro en la base de datos
                this.contexto.Add(paciente);

                this.contexto.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo crear el registro", ex);
            }


            //Retorna el paciente con el Id actualizado
            return Ok(paciente);
        }

        [HttpPut("{idPaciente}")]
        public ActionResult<Paciente> PutPaciente(int idPaciente, Paciente paciente)
        {

            //Si los ids no son iguales la petición es incorrecta
            if (idPaciente == paciente.IdPaciente)
            {
                //Actualiza el registro 
                this.contexto.Entry<Paciente>(paciente).State = EntityState.Modified;

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

        [HttpDelete("{idPaciente}")]
        public ActionResult DeletePaciente(int idPaciente)
        {
            //Consulta el registro a borrar 
            Paciente paciente = this.contexto.Pacientes.Find(idPaciente);

            if (paciente == null)
                return NotFound();

            this.contexto.Pacientes.Remove(paciente);

            this.contexto.SaveChanges();

            return Ok();
        }


    }
}
