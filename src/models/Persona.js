class Persona {
  constructor(nombre, apellido, edad, documento, ciudad, pais, idioma) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.documento = documento;
    this.ciudad = ciudad;
    this.pais = pais;
    this.idioma = idioma;
  }

  getNombreCompleto() {
    return `${this.nombre} ${this.apellido}`.trim();
  }
}

module.exports = Persona;
