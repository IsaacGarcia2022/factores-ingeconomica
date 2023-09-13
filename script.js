"use strict";
const formulario = document.querySelector("#formulario");
const respuesta = document.querySelector("#respuesta");
respuesta.style.display = "none";
const btnTabla = document.querySelector("#btnTabla");
const div_tabla = document.querySelector(".tabla");
div_tabla.style.display = "none";
//el texto del primer label necesita actualizarse segun el factor a encontrar
document.querySelector('#factor').addEventListener("click",comprobarfactor);
function comprobarfactor(){
  if(document.querySelector('#factor').value=='f/p'|| document.querySelector('#factor').value=='a/p'){
    document.querySelector('#encontrar').textContent = 'Ingrese el monto: '
  }else if(document.querySelector('#factor').value=='p/f' || document.querySelector('#factor').value=='a/f'){
    document.querySelector('#encontrar').textContent = 'Ingrese el valor futuro: '
  }else if(document.querySelector('#factor').value=='p/a' || document.querySelector('#factor').value=='f/a'){
    document.querySelector('#encontrar').textContent = 'Ingrese el valor del flujo uniforme: '
  }
}
//evento para cuando hacemos el submit
formulario.addEventListener("submit", validar_calc);

function validar_calc(e) {
  e.preventDefault(); 
  const { monto, tasa, periodo, factor } = obtenerdatos();
  //validaciones de datos
  //para el monto
  if(!monto.trim()){
    document.querySelector('#errormonto').textContent='El campo no puede estar vacio';
    return;
  }else if(isNaN(parseFloat(monto.trim())) || parseFloat(monto.trim())<=0.0){
    document.querySelector('#errormonto').textContent = "Ingrese un numero ademas debe ser valido (no cero ni negativo)";
  return;
  }else{
    document.querySelector('#errormonto').textContent='';
  }

  //para la tasa
  if(!tasa.trim()){
    document.querySelector('#errortasa').textContent='El campo no puede estar vacio';
    return;
  }else if(isNaN(parseFloat(tasa.trim())) || parseFloat(tasa.trim())<=0.0){
    document.querySelector('#errortasa').textContent = "Ingrese un numero ademas debe ser valido (no cero ni negativo)";
  return;
  }else{
    document.querySelector('#errortasa').textContent='';
  }

  //para el periodo
  if(!periodo.trim()){
    document.querySelector('#errorperiodo').textContent='El campo no puede estar vacio';
    return;
  }else if(isNaN(parseFloat(periodo.trim())) || parseFloat(periodo.trim())<=0.0){
    document.querySelector('#errorperiodo').textContent = "Ingrese un numero ademas debe ser valido (no cero ni negativo)";
  return;
  }else{
    document.querySelector('#errorperiodo').textContent='';
  }
  calcular(monto, tasa, periodo, factor);
  
}


function obtenerdatos() {
  const monto = document.querySelector("#monto").value;
  const tasa = document.querySelector("#tasa").value;
  const periodo = document.querySelector("#periodo").value;
  const factor = document.querySelector("#factor").value;
  return { monto, tasa, periodo, factor };
}

function calcular(monto, tasa, periodo, factor) {
  tasa = tasa /100;
  respuesta.textContent = "";
  let valorfinal = 0;
  let factorvalor = 0;
  if (factor == "f/p") {
    valorfinal = monto * Math.pow(1 + tasa, periodo);
    valorfinal = valorfinal.toFixed(2);
    factorvalor = Math.pow(1 + tasa, periodo);
    factorvalor = factorvalor.toFixed(4);
  } else if (factor == "p/f") {
    valorfinal = monto / Math.pow(1 + tasa, periodo);
    valorfinal = valorfinal.toFixed(2);
    factorvalor = 1 / Math.pow(1 + tasa, periodo);
    factorvalor = factorvalor.toFixed(4);
  } else if (factor == "p/a") {
    valorfinal = monto*((Math.pow(1 + tasa, periodo)-1)/(tasa*Math.pow(1 + tasa, periodo)));
    valorfinal = valorfinal.toFixed(2);
    factorvalor = (Math.pow(1 + tasa, periodo)-1)/(tasa*Math.pow(1 + tasa, periodo));
    factorvalor = factorvalor.toFixed(4);
  }else if (factor == "a/p") {
    valorfinal = monto*((tasa * Math.pow(1 + tasa, periodo)) / (Math.pow(1 + tasa, periodo) - 1));
    valorfinal = valorfinal.toFixed(2);
    factorvalor = ((tasa * Math.pow(1 + tasa, periodo)) / (Math.pow(1 + tasa, periodo) - 1));
    factorvalor = factorvalor.toFixed(4);
  }else if (factor == "a/f") {
    valorfinal = monto*(tasa / (Math.pow(1 + tasa, periodo) - 1));
    valorfinal = valorfinal.toFixed(2);
    factorvalor = (tasa / (Math.pow(1 + tasa, periodo) - 1));
    factorvalor = factorvalor.toFixed(4);
  }else if (factor == "f/a") {
    valorfinal = monto*((Math.pow(1 + tasa, periodo) - 1) / tasa);
    valorfinal = valorfinal.toFixed(2);
    factorvalor = ((Math.pow(1 + tasa, periodo) - 1) / tasa);
    factorvalor = factorvalor.toFixed(4);
  }

  respuesta.innerHTML = `
            <p>La respuesta es: <br> <i>${valorfinal}</i> <br><br><br>Y el factor es: <br><i>${factorvalor}</i></p>
        `;

  respuesta.style.display = "block";
  return true;
}
//evento para mostrar la tabla
btnTabla.addEventListener("click", obtenerTabla);
function obtenerTabla() {
  div_tabla.textContent = "";
  let { monto, tasa, periodo, factor } = obtenerdatos();//solo usare la tasa
  if(!tasa.trim()){
    document.querySelector('#errortasa').textContent='Se necesita la tasa para ver la tabla';
    return;
  }else if(isNaN(parseFloat(tasa.trim())) || parseFloat(tasa.trim())<=0.0){
    document.querySelector('#errortasa').textContent = "Ingrese un numero ademas debe ser valido (no cero ni negativo)";
  return;
  }else{
    document.querySelector('#errortasa').textContent='';
  }
  tasa = tasa/100;
  let tabla = document.createElement("table");
  let titulotabla = document.createElement('p');
  titulotabla.textContent = `TABLA PARA EL INTERES DEL ${tasa * 100}%`;
  titulotabla.style.color = 'white';
  let encabezado = `
  <tr>
  <th>N</th>
  <th>F/P</th>
  <th>P/F</th>
  <th>P/A</th>
  <th>A/P</th>
  <th>A/F</th>
  <th>F/A</th>
  </tr>
`;//creo el encabezado de mi tabla

 let cuerpo = "";
 for(let i = 1;i<=10;i++){//ahora creo el cuerpo de mi tabla
  cuerpo += `
  <tr>
  <td>${i}</td>
  <td>${(Math.pow(1 + tasa, i)).toFixed(4)}</td>
  <td>${(1 / Math.pow(1 + tasa, i)).toFixed(4)}</td>
  <td>${((Math.pow(1 + tasa, i)-1)/(tasa*Math.pow(1 + tasa, i))).toFixed(4)}</td>
  <td>${((tasa * Math.pow(1 + tasa, i)) / (Math.pow(1 + tasa, i) - 1)).toFixed(4)}</td>
  <td>${(tasa / (Math.pow(1 + tasa, i) - 1)).toFixed(4)}</td>
  <td>${((Math.pow(1 + tasa, i) - 1) / tasa).toFixed(4)}</td>  
  </tr>
  `;
 }

  tabla.innerHTML = encabezado+cuerpo;
  div_tabla.appendChild(titulotabla);
  div_tabla.appendChild(tabla);
  div_tabla.style.display = "block";
}

