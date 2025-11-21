# 🔐 API de Autenticación – TP9

**Autor:** Jesús Rodriguez  

## 🛠️ Dependencias
- Express  
- jsonwebtoken  
- bcrypt  
- dotenv  

---

## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el repositorio  
```bash
git clone https://github.com/RataRabiosa/TP9.git
cd TP9
```
### 2️⃣ Instalar dependencias
```bash
npm install
```
### 3️⃣ Crear archivo .env con los parametros necesarios
```bash
cat >> .env << EOF
HTTP_PORT=8080
JWT_SECRET=abc1234
JWT_LIFETIME=3600s
EOF
```
### 4️⃣ Ejecutar API server
```bash
node app.js
```
### 5️⃣ Acceder a la aplicacion
```bash
http://localhost:<PUERTO>/
```

## 📡 Rutas de la API

### 1️⃣ POST /api/usuarios/registro

#### Parámetros requeridos (JSON):

- usuario
- clave
- correo

#### 📌 Ejemplo de request:
```
curl -X POST http://localhost:<PUERTO>/api/usuarios/registro \
--header 'Content-Type: application/json' \
--data '{"usuario":"user123","clave":"pw1234","correo":"abc@123.com"}'
````

#### Tipo de retorno: JSON
#### Ejemplo de retorno:
```
{"mensaje":"Usuario registrado exitosamente"}
```

#### Los datos son guardados en memoria, e impresos en la consola de nodejs. La clave es encriptada por defecto por razones de seguridad.
```
[
  {
    usuario: 'jesus',
    clave: '$2b$10$nspmuF12EeTXlGj2WPcC0.VHZ706mO6BHq110H1woeuMjnjnJNNiy',
    correo: 'abc@123.com'
  }
]
```

### 2️⃣ POST /api/usuarios/acceso

#### Parámetros requeridos (JSON):

- usuario
- clave

#### 📌 Ejemplo de request:
```
curl -X POST http://localhost:8080/api/usuarios/acceso \
--header 'Content-Type: application/json' \
--data '{"usuario":"jesus","clave":"rodriguez"}'
```

#### Tipo de retorno: string (JWT token)
#### Ejemplo de retorno:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiamVzdXMiLCJjb3JyZW8iOiJhYmNAMTIzLmNvbSIsImlhdCI6MTc2Mzc2MzIzNSwiZXhwIjoxNzYzNzY2ODM1fQ.juJaculB2ogO6TM-o5ng7YiGGLSwSpcOQ8nv4IIgK10
```

### 3️⃣ GET /api/privado/perfil

#### Parámetros requeridos:

#### Header: Authorization: Bearer <token>

#### 📌 Ejemplo de request:
```
curl http://localhost:8080/api/privado/perfil \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiamVzdXMiLCJjb3JyZW8iOiJhYmNAMTIzLmNvbSIsImlhdCI6MTc2Mzc2MzIzNSwiZXhwIjoxNzYzNzY2ODM1fQ.juJaculB2ogO6TM-o5ng7YiGGLSwSpcOQ8nv4IIgK10'
```

#### Tipo de retorno: JSON
#### Ejemplo de retorno:
```
{"mensaje":"Bienvenido, <usuario>"}
```
