const { faker } = require('@faker-js/faker');
const Persona = require('../models/Persona');
const Empresa = require('../models/Empresa');

const nombresUnicos = new Set();
const documentosUnicos = new Set();


  const ciudadesPorPais = {
  Colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
  Argentina: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
  España: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza'],
  México: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
};

function obtenerCiudadReal(pais) {
  const ciudades = ciudadesPorPais[pais];
  if (ciudades && ciudades.length > 0) {
    return ciudades[Math.floor(Math.random() * ciudades.length)];
  }
  return faker.location.city();
}

function generarUsuario() {

  const esEmpresa = Math.random() < 0.3;
  const paisesDisponibles = Object.keys(ciudadesPorPais);
  const pais = paisesDisponibles[Math.floor(Math.random() * paisesDisponibles.length)];
  const ciudad = obtenerCiudadReal(pais);
  const idioma = pais === 'Colombia' ? 'Español' : faker.location.language().name;

  let nombre = faker.person.firstName();
  let apellido = esEmpresa ? '' : faker.person.lastName();
  let nombreCompleto = `${nombre} ${apellido}`.trim();

  while (nombresUnicos.has(nombreCompleto)) {
    nombre = faker.person.firstName();
    apellido = esEmpresa ? '' : faker.person.lastName();
    nombreCompleto = `${nombre} ${apellido}`.trim();
  }
  nombresUnicos.add(nombreCompleto);

  let documento;
  if (esEmpresa) {
    documento = '9' + faker.number.int({ min: 10000000, max: 99999999 });
  } else {
    const edad = faker.number.int({ min: 11, max: 79 });
    if (edad < 18) {
      documento = faker.number.int({ min: 11000000, max: 11999999 }).toString();
    } else {
      documento = faker.number.int({ min: 100000000, max: 99999999999 }).toString();
    }

    while (documentosUnicos.has(documento)) {
      documento = faker.number.int({ min: 100000000, max: 99999999999 }).toString();
    }
    documentosUnicos.add(documento);

    return new Persona(nombre, apellido, edad, documento, ciudad, pais, idioma);
  }

  while (documentosUnicos.has(documento)) {
    documento = '9' + faker.number.int({ min: 10000000, max: 99999999 });
  }
  documentosUnicos.add(documento);

  return new Empresa(nombre, documento, ciudad, pais, idioma);
}

module.exports = { generarUsuario };
