const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../output/usuarios.db'));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      apellido TEXT,
      edad INTEGER,
      documento TEXT UNIQUE,
      ciudad TEXT,
      pais TEXT,
      idioma TEXT
    )
  `);
});

function guardarUsuario(usuario) {
  const stmt = db.prepare(`
    INSERT INTO usuarios (nombre, apellido, edad, documento, ciudad, pais, idioma)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([
    usuario.nombre,
    usuario.apellido,
    usuario.edad,
    usuario.documento,
    usuario.ciudad,
    usuario.pais,
    usuario.idioma
  ]);
  stmt.finalize();
}

module.exports = { guardarUsuario };
