#  Generador de Usuarios y Empresas
NOTA: al descargar o clonar el repositorio cambiar el nombre de la carpeta principal por generar-datos y ademas dejarla alojada directo en el dico C, para que se pueda acceder al output desde el codigo automatizado con selenium.

Este proyecto en Node.js genera datos falsos de personas y empresas, los guarda en una base de datos SQLite y exporta los resultados a un archivo CSV. Utiliza la librería `@faker-js/faker` para crear información realista y aleatoria.

---

## Estructura del Proyecto

```
src/
├── models/
│   ├── Empresa.js       # Clase Empresa (hereda de Persona)
│   └── Persona.js       # Clase base Persona
├── services/
│   ├── db.js            # Conexión y escritura en la base de datos SQLite
│   └── generador.js     # Lógica de generación de usuarios/empresas
└── utils/
    └── index.js         # Punto de entrada del proyecto
output/
└── usuarios.csv         # Archivo generado con los datos
└── usuarios.db          # Base de datos SQLite con los datos generados
```

---

## ¿Qué hace este proyecto?

- Genera un número configurable de personas y empresas con información aleatoria.
- Asigna ciudades reales según el país.
- Asegura unicidad en nombres y documentos.
- Guarda los datos en:
  - Una base de datos SQLite (`usuarios.db`)
  - Un archivo CSV (`usuarios.csv`)

---

##  Lógica Principal

- **Persona.js**: Clase base que contiene atributos como nombre, apellido, edad, documento, ciudad, país e idioma.
- **Empresa.js**: Subclase que hereda de Persona y representa una entidad sin apellido ni edad.
- **generador.js**:
  - Define probabilísticamente si se generará una persona o empresa.
  - Usa ciudades reales por país (Colombia, Argentina, España, México).
  - Asegura que los nombres y documentos no se repitan.
- **db.js**: Conecta a SQLite y crea la tabla `usuarios` si no existe. Inserta cada usuario generado.
- **index.js**:
  - Ejecuta el generador de usuarios.
  - Guarda los resultados en la base de datos y en un CSV.
  - Permite especificar cuántos registros generar mediante argumentos por consola.

---

##  Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Json2001/PruebaTecnicaGreenSQAParte1
   cd PruebaTecnicaGreenSQAParte1
   ```

2. Instala las dependencias:
   ```bash
   npm install @faker-js/faker sqlite3
   ```

---

## Uso

Ejecuta el script pasando la cantidad de usuarios como argumento:

```bash
node src/utils/index.js 10
```

> Si no se especifica una cantidad, se generarán 4 usuarios por defecto.

---

## Salidas

- `output/usuarios.csv`: Lista de los usuarios generados.
- `output/usuarios.db`: Base de datos SQLite con la tabla `usuarios`.

---

## Notas

- Empresas no tienen edad ni apellido.
- Los documentos de personas menores de 18 años se generan con un patrón diferente.
- Los idiomas se asignan aleatoriamente excepto para Colombia, que siempre será español.

---
