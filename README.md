# 🎵 SoundCircle

<div align="center">

![SoundCircle Logo](https://img.shields.io/badge/🎵-SoundCircle-ff6b6b?style=for-the-badge&labelColor=4ecdc4)

**Tu círculo musical personal**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white)](https://cloudinary.com/)

---

*Una red social musical donde los usuarios pueden crear su perfil, gestionar sus canciones favoritas y conectar con otros amantes de la música.*

</div>

## 📖 Tabla de Contenidos

- [🚀 Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [📋 Requisitos](#-requisitos)
- [🔧 Configuración](#-configuración)
- [📊 Modelos de Datos](#-modelos-de-datos)
- [🛣️ Endpoints de la API](#️-endpoints-de-la-api)
- [👥 Sistema de Roles](#-sistema-de-roles)
- [🌱 Semillas (Seeds)](#-semillas-seeds)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔒 Seguridad](#-seguridad)
- [📸 Gestión de Imágenes](#-gestión-de-imágenes)
- [🚀 Uso de la API](#-uso-de-la-api)

## 🚀 Características

### ✨ Funcionalidades Principales

- 🔐 **Autenticación completa** con JWT
- 👤 **Gestión de perfiles** con imágenes de usuario
- 🎵 **Sistema de canciones favoritas** sin duplicados
- 👑 **Sistema de roles** (User/Admin)
- 📸 **Subida de imágenes** con Cloudinary
- 🌱 **Sistema de semillas** para datos de prueba
- 🔒 **Seguridad robusta** con middlewares

### 🎯 Características Técnicas

- ✅ API RESTful con Express.js
- ✅ Base de datos MongoDB Atlas
- ✅ Autenticación JWT
- ✅ Validación de datos
- ✅ Manejo de errores centralizado
- ✅ Middlewares de autorización
- ✅ Relaciones entre modelos
- ✅ Gestión de archivos en la nube

## 🛠️ Tecnologías

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Node.js** | 18.x+ | Entorno de ejecución JavaScript |
| **Express.js** | 5.1.0 | Framework web para Node.js |
| **MongoDB** | 6.18.0 | Base de datos NoSQL |
| **Mongoose** | 8.16.4 | ODM para MongoDB |
| **JWT** | 9.0.2 | Autenticación con tokens |
| **Bcrypt** | 6.0.0 | Hashing de contraseñas |
| **Cloudinary** | 1.41.3 | Gestión de imágenes en la nube |
| **Multer** | 2.0.2 | Middleware para subida de archivos |

## 📋 Requisitos

### Requisitos de Sistema

- **Node.js** versión 18.0 o superior
- **npm** versión 8.0 o superior
- **MongoDB Atlas** cuenta activa
- **Cloudinary** cuenta activa

### Variables de Entorno Requeridas

```env
PORT=3000
DB_URL=mongodb+srv://usuario:password@cluster.mongodb.net/soundcircle
JWT_SECRET=tu_clave_super_secreta_aqui_123456789
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## 🔧 Configuración

### MongoDB Atlas Setup

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear un nuevo cluster
3. Configurar usuario de base de datos
4. Obtener la cadena de conexión
5. Añadir tu IP a la whitelist

### Cloudinary Setup

1. Crear cuenta en [Cloudinary](https://cloudinary.com/)
2. Obtener credenciales del dashboard
3. Configurar las variables de entorno

## 📊 Modelos de Datos

### 👤 Usuario (User)

```javascript
{
  name: String,           // Nombre del usuario
  email: String,          // Email único
  password: String,       // Contraseña hasheada
  role: String,          // 'user' | 'admin'
  image: String,         // URL de Cloudinary
  favoriteSongs: [ObjectId], // Referencias a canciones
  createdAt: Date,       // Fecha de creación
  updatedAt: Date        // Fecha de actualización
}
```

### 🎵 Canción (Song)

```javascript
{
  title: String,         // Título de la canción (requerido, máx 100 caracteres)
  artist: String,        // Artista (requerido, máx 50 caracteres)
  album: String,         // Álbum (opcional, máx 100 caracteres, default: 'Single')
  genre: String,         // Género musical (requerido, enum: rock, pop, jazz, etc.)
  year: Number,          // Año de lanzamiento (entre 1500 y año actual)
  duration: String,      // Duración en formato mm:ss
  createdAt: Date,       // Fecha de creación
  updatedAt: Date        // Fecha de actualización
}
```

## 🛣️ Endpoints de la API

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Registro de usuario | ❌ |
| `POST` | `/api/auth/login` | Inicio de sesión | ❌ |

### 👤 Usuario (`/api/users`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| `GET` | `/api/users/profile` | Ver perfil propio | ✅ | User |
| `PUT` | `/api/users/profile` | Actualizar perfil | ✅ | User |
| `DELETE` | `/api/users/profile` | Eliminar cuenta propia | ✅ | User |
| `GET` | `/api/users/favorites` | Ver canciones favoritas | ✅ | User |
| `POST` | `/api/users/favorites/:songId` | Añadir a favoritos | ✅ | User |
| `DELETE` | `/api/users/favorites/:songId` | Quitar de favoritos | ✅ | User |

### 🎵 Canciones (`/api/songs`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| `GET` | `/api/songs` | Listar canciones | ✅ | User |
| `GET` | `/api/songs/:id` | Ver canción específica | ✅ | User |
| `POST` | `/api/songs` | Crear canción | ✅ | Admin |
| `PUT` | `/api/songs/:id` | Actualizar canción | ✅ | Admin |
| `DELETE` | `/api/songs/:id` | Eliminar canción | ✅ | Admin |

### ⚡ Administración (`/api/admin`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| `GET` | `/api/admin/users` | Listar todos los usuarios | ✅ | Admin |
| `GET` | `/api/admin/users/:id` | Ver usuario específico | ✅ | Admin |
| `PUT` | `/api/admin/users/:id/promote` | Cambiar rol de usuario | ✅ | Admin |
| `DELETE` | `/api/admin/users/:id` | Eliminar cualquier usuario | ✅ | Admin |

## 👥 Sistema de Roles

### 🟢 Usuario (User)

**Permisos:**
- ✅ Ver y editar su propio perfil
- ✅ Eliminar su propia cuenta
- ✅ Gestionar sus canciones favoritas
- ✅ Ver todas las canciones
- ❌ No puede crear canciones
- ❌ No puede editar/eliminar canciones

**Restricciones:**
- ❌ No puede cambiar su propio rol
- ❌ No puede ver/editar otros usuarios
- ❌ No puede eliminar cuentas ajenas
- ❌ No puede acceder a endpoints de admin

### 🔴 Administrador (Admin)

**Permisos:**
- ✅ Todos los permisos de usuario
- ✅ Ver todos los usuarios
- ✅ Cambiar roles de usuarios
- ✅ Eliminar cualquier cuenta
- ✅ Editar/eliminar cualquier canción
- ✅ Acceso completo a la API

## 🌱 Semillas (Seeds)

### Ejecutar Semillas

```bash
# Semilla de canciones
npm run seed

# O manualmente
node src/utils/seeds/songsSeed.js
```

### Datos Incluidos

- **28 canciones** de diferentes géneros
- **Géneros**: Rock, Pop, Hip-Hop, Electronic, Jazz, Classical, Reggae, Country, Blues, Folk, Indie, Metal
- **Artistas reconocidos** para pruebas realistas

## 📁 Estructura del Proyecto

```
soundcircle/
├── 📁 src/
│   ├── 📁 api/
│   │   ├── 📁 controllers/
│   │   │   ├── authController.js    # Controlador de autenticación
│   │   │   ├── userController.js    # Controlador de usuarios
│   │   │   └── songController.js    # Controlador de canciones
│   │   ├── 📁 models/
│   │   │   ├── userModel.js         # Modelo de usuario
│   │   │   └── songModel.js         # Modelo de canción
│   │   └── 📁 routes/
│   │       ├── authRoutes.js        # Rutas de autenticación
│   │       ├── userRoutes.js        # Rutas de usuario
│   │       ├── songRoutes.js        # Rutas de canciones
│   │       └── adminRoutes.js       # Rutas de administración
│   ├── 📁 config/
│   │   ├── cloudinary.js            # Configuración de Cloudinary
│   │   └── db.js                    # Configuración de MongoDB
│   ├── 📁 data/
│   │   └── songs.js                 # Datos de canciones para semillas
│   ├── 📁 middlewares/
│   │   ├── auth.js                  # Middleware de autenticación
│   │   ├── rolecheck.js             # Middleware de roles
│   │   └── uploadImg.js             # Middleware de subida de imágenes
│   └── 📁 utils/
│       ├── deleteImg.js             # Utilidad para eliminar imágenes
│       ├── jwt.js                   # Utilidades JWT
│       └── 📁 seeds/
│           └── songsSeed.js         # Script de semillas
├── 📄 .env.example                  # Variables de entorno ejemplo
├── 📄 .gitignore                    # Archivos ignorados por Git
├── 📄 index.js                      # Punto de entrada de la aplicación
├── 📄 package.json                  # Dependencias y scripts
├── 📄 README.md                     # Este archivo
```

## 🔒 Seguridad

### Medidas Implementadas

- 🔐 **Contraseñas hasheadas** con bcrypt
- 🎫 **Autenticación JWT** con expiración
- 🛡️ **Middlewares de autorización** por rol
- ✅ **Validación de datos** en modelos
- 🚫 **Prevención de duplicados** en favoritos

### Buenas Prácticas

- Variables de entorno para credenciales
- Validación de entrada en todos los endpoints
- Manejo centralizado de errores
- Logs de seguridad
- Rate limiting (recomendado para producción)

## 📸 Gestión de Imágenes

### Cloudinary Integration

- ☁️ **Almacenamiento en la nube** escalable
- 🖼️ **Optimización automática** de imágenes
- 🗑️ **Eliminación automática** al borrar usuario
- 📱 **Responsive** y adaptable
- 🔒 **URLs seguras** y persistentes

### Formatos Soportados

- `JPEG`, `PNG`, `GIF`, `WebP`

## 🚀 Uso de la API

### Registro de Usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456",
    "bio": "Amante de la música rock"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "123456"
  }'
```

### Añadir Canción a Favoritos

```bash
curl -X POST http://localhost:3000/api/users/favorites/64f1a2b3c4d5e6f7g8h9i0j1 \
  -H "Authorization: Bearer tu_jwt_token"
```

### Crear Nueva Canción

```bash
curl -X POST http://localhost:3000/api/songs \
  -H "Authorization: Bearer tu_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Canción Favorita",
    "artist": "Artista Genial",
    "album": "Álbum Increíble",
    "genre": "rock",
    "year": 2023,
    "duration": "3:45"
  }'
```
<div align="center">


**Desarrollado con ❤️**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tu-usuario/soundcircle)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/robertoperezmesa/)

</div>