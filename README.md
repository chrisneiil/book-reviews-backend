# BookReviews - Backend

### Descripción
Este proyecto es el **backend** de la aplicación BookReviews. Es una API RESTful que gestiona la información de los libros, reseñas y usuarios. El servidor proporciona los endpoints necesarios para que el frontend pueda buscar libros, autenticar usuarios y gestionar la "Biblioteca" privada de cada usuario.

---

### Características Clave

- **API RESTful**: Proporciona endpoints para buscar, guardar, actualizar y eliminar libros.
- **Autenticación Básica**: Implementa un sistema de autenticación básica (`username:password`) para proteger las rutas privadas.
- **Persistencia de Datos**: Utiliza un sistema de persistencia (como una base de datos o archivos JSON) para almacenar las reseñas y la información de la "Biblioteca" del usuario.
- **Rutas Protegidas**: Los endpoints para la "Biblioteca" y las últimas búsquedas requieren autenticación para acceder.
- **Integración con OpenLibrary API**: El servidor se conecta con la API de OpenLibrary para obtener los datos de los libros.

---

### Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución del servidor.
- **Express.js**: Framework para la creación de la API REST.
- **JSON o Base de Datos**: Para la persistencia de datos (ej. un archivo `db.json` para una solución simple o una base de datos real como MongoDB o PostgreSQL).

---

### Instalación y Configuración 🚀

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

```bash
# Clona el repositorio
git clone https://github.com/chrisneiil/book-reviews-backend.git
cd book-reviews-backend

# Instala las dependencias
npm install

# Configura las variables de entorno (si es necesario)
# Por ejemplo, para la persistencia de datos o claves de API.

# Inicia el servidor de desarrollo
en consola asegurarse de estar en la carpeta con index.js
node index.js 
```
**Nota**: La autenticación básica requerida para los endpoints privados se realiza con el usuario `admin` y la contraseña `1234`
### Endpoints de la API

| Método | Endpoint | Descripción | Requisito |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/books/search?q={query}` | Busca libros en OpenLibrary. | Público |
| `GET` | `/api/books/last-search` | Obtiene las últimas búsquedas del usuario. | Autenticación Requerida |
| `GET` | `/api/books/my-library` | Obtiene los libros guardados en la biblioteca del usuario. | Autenticación Requerida |
| `POST`| `/api/books/my-library` | Guarda un nuevo libro en la biblioteca del usuario. | Autenticación Requerida |
| `PUT` | `/api/books/my-library/{id}` | Actualiza una reseña de un libro existente. | Autenticación Requerida |
| `DELETE`| `/api/books/my-library/{id}` | Elimina un libro de la biblioteca. | Autenticación Requerida |