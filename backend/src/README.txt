Esto es un backend nativo para configurar cualquier motor de bases datos y crear las diferentes rutas api con su
authentication token

En este ejemplo esta configurado 2 archivos config. uno tanto para motor bases de datos mysql y el otro para SqlServer.


las variables de entorno es lo que se modifica para conectar con la bases datos. Dependiendo de la variable.

DB_ENGINE el especifica que tipo de config va usar. 

Los modules son carpetas que normalmente los nombre es de las tablas de la bases de datos, donde se configura los router y el controllador es el que personifica la conexion.

En la carpeta dataBases se encuentran el archivo con las funciones que permite realizar los crud basicos, consultar,
guardar, eliminar y buscar.

Si existe una consulta especifica y personalizada se realiza en cada modulo en el archivo query

IMPORTANTE: cambiar la variable de entorno en el front por el motor de bases de datos mssql o mysql.

