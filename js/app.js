const criptomonedasSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

const objBusqueda = {
  moneda: "",
  criptomoneda: "",
};

//Crear un Promise
const obtenerCriptomonedas = (criptomonedas) =>
  new Promise((resolve) => {
    resolve(criptomonedas);
  });

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptomonedas();

  formulario.addEventListener("submit", submitFormulario);

  criptomonedasSelect.addEventListener("change", leerValor);

  monedaSelect.addEventListener("change", leerValor);
});

async function consultarCriptomonedas() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  /* fetch(url)
    .then((respuesta) => respuesta.json())
    .then((result) => obtenerCriptomonedas(result.Data))
    .then((criptomonedas) => selectCriptomonedas(criptomonedas));
*/
  try {
    const respuesta = await fetch(url);
    const result = await respuesta.json();
    const criptomonedas = await obtenerCriptomonedas(result.Data);
    selectCriptomonedas(criptomonedas);
  } catch (error) {
    console.log(error);
  }
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;

    const option = document.createElement("option");
    option.textContent = FullName;
    option.value = Name;

    criptomonedasSelect.appendChild(option);
  });
}

function leerValor(e) {
  e.preventDefault();
  objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
  e.preventDefault();
  limpiarHTML();
  //Validar
  const { moneda, criptomoneda } = objBusqueda;

  if (moneda === "" || criptomoneda === "") {
    mostrarAlerta("Both fields are required");
    return;
  }

  //Consultar la API
  consultarAPI();
}

function mostrarAlerta(msg) {
  const existeError = document.querySelector(".error");

  if (!existeError) {
    const divMensaje = document.createElement("div");
    divMensaje.textContent = msg;
    divMensaje.classList.add("error");

    formulario.appendChild(divMensaje);

    //Despues de 3 segundos hago que desaparezca el mensaje
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

async function consultarAPI() {
  const { moneda, criptomoneda } = objBusqueda;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  mostrarSpinner();

  /*fetch(url)
    .then((answer) => answer.json())
    .then((result) =>
      mostrarCotizacionHTML(result.DISPLAY[criptomoneda][moneda])
    );
  */

  try {
    const answer = await fetch(url);
    const result = await answer.json();
    mostrarCotizacionHTML(result.DISPLAY[criptomoneda][moneda]);
  } catch (error) {
    console.log(error);
  }
}

function mostrarCotizacionHTML(cotizacion) {
  limpiarHTML();
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.innerHTML = `The Price is:  <span>${PRICE}</span>`;

  const precioAlto = document.createElement("p");
  precioAlto.innerHTML = `<p>Highest price of the day:  <span>${HIGHDAY}</span></p>`;

  const precioBajo = document.createElement("p");
  precioBajo.innerHTML = `<p>Lowest price of the day:  <span>${LOWDAY}</span></p>`;

  const ultimasHoras = document.createElement("p");
  ultimasHoras.innerHTML = `<p>Last variation of the price in the last 24 hours:  <span>${CHANGEPCT24HOUR}%</span></p>`;

  const ultimaActualizacion = document.createElement("p");
  ultimaActualizacion.innerHTML = `<p>Last Update:  <span>${LASTUPDATE}</span></p>`;

  resultado.appendChild(precio);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(ultimasHoras);
  resultado.appendChild(ultimaActualizacion);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarSpinner() {
  limpiarHTML();

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");

  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
    `;
  resultado.appendChild(spinner);
}
