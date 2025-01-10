# PORTAL ENCUESTAS

El portal de encuestas es una plataforma en línea diseñada para crear, distribuir y analizar encuestas. Esta herramientas permite a los usuarios recopilar datos y opiniones de un grupo específico de personas de manera eficiente y organizada.

## Características

- Creacion, actualizacion y eliminacion de encuestas o formularios
- Registro de preguntas de la encuestas
- Configuracion de salto de preguntas
- Configuracion de puntajes, requeridos, 
- Herramienta de configuracion de preguntas
- Bibliotecas de preguntas
- Configuracion de orden de preguntas
- Configuracion de visual de encuestas
- entre muchas otras configuracion 


## Instalación

Sigue los pasos a continuación para instalar y ejecutar la aplicación localmente.

### 1. Clonar el repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/desarrollosDaka/encuestas.git
```

### 2. Instalar las dependencias

El proyecto está dividido en dos carpetas: `backend` y `frontend`. Instala las dependencias de ambas:

#### Backend
Navega al directorio `backend` e instala las dependencias:

```bash
cd encuestas/backend

npm install
```
El backend no usa ORM, por lo que deberas primeramente crear la bases de datos en un motor mysql. Los script se encuentran en la carpeta scripts.
1. ejecutar primeramente el archivo createDatabase.sql
2. ejecutar el archivo createTables.sql
3. crea un archivo .env en la raiz de la carpeta "backend", puedes tomar el ejemplo del archivo env_example.txt configurando las variables de entorno en base a tu bases de datos. 
4. ejecutar data de prueba para el funcionamiento del login (archivo data.sql)

#### Frontend
Navega al directorio `frontend` e instala las dependencias:

```bash
cd encuestas/frontend
npm install
```
1. crea un archivo .env en la raiz de la carpeta "frontend", puedes tomar el ejemplo del archivo env_example.txt configurando las variables de entorno en base a tu datos de dominio(produccion). Las variables en entorno desarrollo lo dejas tal cual

### 3. Iniciar la aplicación

Inicia el backend y el frontend en orden. Asegúrate de estar en el directorio correspondiente antes de ejecutar los comandos:

#### Backend
Dentro del directorio `backend`, ejecuta:

```bash
npm run dev
```

#### Frontend
Dentro del directorio `frontend`, ejecuta:

```bash
npm run serve
```

La aplicación estará disponible en tu navegador localmente.

## Uso

Para una demostración visual de la aplicación en funcionamiento, consulta el siguiente enlace o gif:

![Demostración de la aplicación]


## Posibles mejoras

- Analisis de datos
- reportes
- graficos