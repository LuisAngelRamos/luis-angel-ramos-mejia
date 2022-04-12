Hola a todos.
Cree una carpeta llamada postman en la raiz donde encontraran un archivo con los request, solo necesitan importarlos en postman.
Ademas agregue una ruta dentro de auth.controller para agregar rapidamente un registro de una aplicación, igual este viene en el archivo de postman.

Para probar la aplicacion hay ciertos pasos que seguir para obtener una mejor experiencia:
	1. Crear el registro de una aplicación con 'add aplication'.
	2. Con el mismo nombre de la aplicación mandar la petición a 'auth', esta retornara un token.
	3. Para cualquier petición con prefijo logs, sera necesario añadir el token obtenido en la pestaña de postman llamada Authorization, de tipo Bearer Token.
	4. Crea el log ya establecido o cambia los valores en 'add log'.
	5. Obten todos los logs con 'get logs'.
	6. Extrae el id de algun log.
	7. Prueba 'get log', 'update log' o 'delete log', para estos es necesario añadir el id del log antes obtenido en la url.

Puntos Importantes:
	1. Para crear un log todos los campos son requeridos a excepcion del aplication_id que se obtiene del token.
	2. Para editar un log no hay campos requeridos.
	3. El token expira en 1 hora.
	4. Si se solicita un nuevo token el anterior dejara de ser valido.
	5. Si usas 'update log' o 'delete log' intenta volver a obtener el log con 'get log' para ver los cambios echos o recibir un error de log no encontrado.
	6. No se puede crear una aplicacion con el mismo nombre.
	7. Si se intenta actualizar un registro eliminado el sistema respondera codigo 400.