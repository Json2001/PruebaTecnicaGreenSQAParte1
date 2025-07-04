const Persona = require('./Persona');

class Empresa extends Persona {
  constructor(nombre, documento, ciudad, pais, idioma) {
    super(nombre, '', null, documento, ciudad, pais, idioma);
  }
}

module.exports = Empresa;
