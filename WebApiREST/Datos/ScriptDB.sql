USE [master]
GO
/****** Object:  Database [NexosHospital]    Script Date: 5/07/2020 9:27:12 p. m. ******/
CREATE DATABASE [NexosHospital]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'NexosHospital', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.R5SQLSERVER\MSSQL\DATA\NexosHospital.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'NexosHospital_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.R5SQLSERVER\MSSQL\DATA\NexosHospital_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [NexosHospital] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [NexosHospital].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [NexosHospital] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [NexosHospital] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [NexosHospital] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [NexosHospital] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [NexosHospital] SET ARITHABORT OFF 
GO
ALTER DATABASE [NexosHospital] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [NexosHospital] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [NexosHospital] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [NexosHospital] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [NexosHospital] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [NexosHospital] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [NexosHospital] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [NexosHospital] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [NexosHospital] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [NexosHospital] SET  ENABLE_BROKER 
GO
ALTER DATABASE [NexosHospital] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [NexosHospital] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [NexosHospital] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [NexosHospital] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [NexosHospital] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [NexosHospital] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [NexosHospital] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [NexosHospital] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [NexosHospital] SET  MULTI_USER 
GO
ALTER DATABASE [NexosHospital] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [NexosHospital] SET DB_CHAINING OFF 
GO
ALTER DATABASE [NexosHospital] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [NexosHospital] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [NexosHospital] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [NexosHospital] SET QUERY_STORE = OFF
GO
USE [NexosHospital]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 5/07/2020 9:27:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Doctores]    Script Date: 5/07/2020 9:27:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Doctores](
	[IdDoctor] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [nvarchar](max) NULL,
	[Apellidos] [nvarchar](max) NULL,
	[Especialidad] [nvarchar](max) NULL,
	[Credencial] [nvarchar](max) NULL,
	[Hospital] [nvarchar](max) NULL,
	[Creado] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Doctores] PRIMARY KEY CLUSTERED 
(
	[IdDoctor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pacientes]    Script Date: 5/07/2020 9:27:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pacientes](
	[IdPaciente] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [nvarchar](max) NULL,
	[Apellidos] [nvarchar](max) NULL,
	[IdSeguridadSocial] [nvarchar](max) NULL,
	[CodigoPostal] [nvarchar](max) NULL,
	[NumeroContacto] [nvarchar](max) NULL,
	[Creado] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Pacientes] PRIMARY KEY CLUSTERED 
(
	[IdPaciente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PacientesDoctores]    Script Date: 5/07/2020 9:27:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PacientesDoctores](
	[IdPacienteDoctor] [int] IDENTITY(1,1) NOT NULL,
	[IdDoctor] [int] NOT NULL,
	[IdPaciente] [int] NOT NULL,
 CONSTRAINT [PK_PacientesDoctores] PRIMARY KEY CLUSTERED 
(
	[IdPacienteDoctor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_PacientesDoctores_IdDoctor]    Script Date: 5/07/2020 9:27:13 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_PacientesDoctores_IdDoctor] ON [dbo].[PacientesDoctores]
(
	[IdDoctor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PacientesDoctores_IdPaciente]    Script Date: 5/07/2020 9:27:13 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_PacientesDoctores_IdPaciente] ON [dbo].[PacientesDoctores]
(
	[IdPaciente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PacientesDoctores]  WITH CHECK ADD  CONSTRAINT [FK_PacientesDoctores_Doctores_IdDoctor] FOREIGN KEY([IdDoctor])
REFERENCES [dbo].[Doctores] ([IdDoctor])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PacientesDoctores] CHECK CONSTRAINT [FK_PacientesDoctores_Doctores_IdDoctor]
GO
ALTER TABLE [dbo].[PacientesDoctores]  WITH CHECK ADD  CONSTRAINT [FK_PacientesDoctores_Pacientes_IdPaciente] FOREIGN KEY([IdPaciente])
REFERENCES [dbo].[Pacientes] ([IdPaciente])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PacientesDoctores] CHECK CONSTRAINT [FK_PacientesDoctores_Pacientes_IdPaciente]
GO
USE [master]
GO
ALTER DATABASE [NexosHospital] SET  READ_WRITE 
GO
