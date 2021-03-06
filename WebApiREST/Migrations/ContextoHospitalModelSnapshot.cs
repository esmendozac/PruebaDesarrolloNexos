﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApiREST.Datos;

namespace WebApiREST.Migrations
{
    [DbContext(typeof(ContextoHospital))]
    partial class ContextoHospitalModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApi.Modelos.Doctor", b =>
                {
                    b.Property<int>("IdDoctor")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Apellidos");

                    b.Property<DateTime>("Creado");

                    b.Property<string>("Credencial");

                    b.Property<string>("Especialidad");

                    b.Property<string>("Hospital");

                    b.Property<string>("Nombres");

                    b.HasKey("IdDoctor");

                    b.ToTable("Doctores");
                });

            modelBuilder.Entity("WebApi.Modelos.Paciente", b =>
                {
                    b.Property<int>("IdPaciente")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Apellidos");

                    b.Property<string>("CodigoPostal");

                    b.Property<DateTime>("Creado");

                    b.Property<string>("IdSeguridadSocial");

                    b.Property<string>("Nombres");

                    b.Property<string>("NumeroContacto");

                    b.HasKey("IdPaciente");

                    b.ToTable("Pacientes");
                });

            modelBuilder.Entity("WebApi.Modelos.PacienteDoctor", b =>
                {
                    b.Property<int>("IdPacienteDoctor")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdDoctor");

                    b.Property<int>("IdPaciente");

                    b.HasKey("IdPacienteDoctor");

                    b.HasIndex("IdDoctor");

                    b.HasIndex("IdPaciente");

                    b.ToTable("PacientesDoctores");
                });

            modelBuilder.Entity("WebApi.Modelos.PacienteDoctor", b =>
                {
                    b.HasOne("WebApi.Modelos.Doctor", "Doctor")
                        .WithMany("PacientesDoctores")
                        .HasForeignKey("IdDoctor")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebApi.Modelos.Paciente", "Paciente")
                        .WithMany("PacientesDoctores")
                        .HasForeignKey("IdPaciente")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
