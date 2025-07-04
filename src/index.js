const fs = require('fs');
const path = require('path');
const { generarUsuario } = require('./services/generador');
const { guardarUsuario } = require('./services/db');

const cantidad = parseInt(process.argv[2]) || 4; //campo para ingresar cantidad de datos a crear.

const csvHeader = 'nombre,apellido,edad,documento,ciudad,pais,idioma\n';
const lines = [csvHeader];

for (let i = 0; i < cantidad; i++) {
  const usuario = generarUsuario();
  guardarUsuario(usuario);
  lines.push([
  usuario.nombre,
  usuario.apellido || '',
  usuario.edad !== undefined ? usuario.edad : '',
  usuario.documento,
  usuario.ciudad,
  usuario.pais,
  usuario.idioma
].join(','));

}

fs.writeFileSync(path.join(__dirname, '../output/usuarios.csv'), lines.join('\n'));

console.log(`Se generaron ${cantidad} usuarios. Revisa el archivo usuarios.csv y la base de datos usuarios.db`);
