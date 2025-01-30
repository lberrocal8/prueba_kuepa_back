# Prueba Fullstack Dev: Kuepa
Esta sección abarca el stack del back-end de la aplicación. Las siguientes son las tecnologias utilizadas para la construcción del mismo:

- **Express.js** (última versión disponible: v5.0).
- **Node** (última versión disponible: v22.12.0).
- **MongoDB**.
- **PostgreSQL**.


## Instalación

El proceso de Instalación incluye los siguientes pasos:

#### Instalar y configurar PostgreSQL.

Ingresar a la dirección https://sbp.enterprisedb.com/getfile.jsp?fileid=1259337. Esto descarga el instalador, siga las instrucciones de instalación y tenga presente el **usuario** y **clave** de ingreso al servidor de postgreSQL. Luego:
- Abra PgAdmin y cree una nueva base de datos llamada **kuepa**.
- Despliegue la base de datos creada y dirijase a **Esquemas** > **Public** y haga click derecho en **Tablas** > **Herramienta de consulta**. Escriba el siguiente código para crear la tabla.

```bash

CREATE TABLE IF NOT EXISTS public.users (
    "idUser" integer NOT NULL DEFAULT nextval('"users_idUser_seq"'::regclass),
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    username character varying(200) COLLATE pg_catalog."default" NOT NULL,
    passwordhash character varying COLLATE pg_catalog."default" NOT NULL,
    usertype character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PRIMARYKey" PRIMARY KEY ("idUser"),
    CONSTRAINT "UNIQUEUsername" UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
```

Esta listo para registrar nuevos usuarios desde el front-end.

#### Instalar MongoDB.

Visite https://www.mongodb.com/try/download/community, escoja su sistema y descargue el archivo .msi y siga las instrucciones del instalador.

- En el tipo de instalación, seleccionar **Complete**.
- En la sección **Service Configuration**, asegurese de seleccionar: `Run MongoDB as a Network Service user` (sin necesidad de credenciales).

#### Para descargar el proyecto.

- Clonar el repositorio de github:

```bash
git clone https://github.com/lberrocal8/prueba_kuepa_back.git
```

- Desde la carpeta raiz del proyecto, abrir una terminal de comandos y ejecutar en modo desarrollador:

```bash
  node server.js
```

- Crear un archivo `.env` e insertar lo siguiente: (Debe cambiar PG_PASSWORD y SECRET_KEY)

```bash
PORT=5000
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=Clave_de_acceso_a_postgre
PG_DATABASE=kuepa
PG_PORT=5432
SECRET_KEY="Escriba_una_secret_aleatoria"
```

## Referencia de la API

#### Registrar un usuario en la base de datos (PostgreSQL)

```http
  POST /register
```

| Parametro | Tipe     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Requerido**. Nombre del usuario |
| `username`      | `string` | **Requerido**. Nombre de usuario del usuario |
| `password`      | `string` | **Requerido**. Contraseña del usuario |
| `usertype`      | `string` | **Requerido**. Tipo de usuario (Estudiante o Moderador) |

#### Inicio de sesión de un usuario (PostgreSQL)

```http
  POST /login
```

| Parametro | Tipe     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Requerido**. Nombre de usuario del usuario |
| `password`      | `string` | **Requerido**. Contraseña del usuario |

#### Obtener los mensajes almacenados en la base de datos (MongoDB)

```http
  GET /api/messages
```

| Parametro | Tipe     | Descripción                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Requerido**. Token de acceso |
