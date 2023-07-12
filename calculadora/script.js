// Obtener referencias a los elementos de la calculadora
const display = {
    numAnterior: document.getElementById("numAnterior"),
    numActual: document.getElementById("numActual"),
  };
  
  const buttons = document.querySelectorAll(".num, .operador");
  const clear = document.querySelector(".col-2");
  const borrar = document.getElementById("delete");
  const equalsButton = document.getElementById("igual");
  
  let numUno = "";
  let numDos = "";
  let operador = undefined;
  
  // Función para actualizar el display
  function actualizarDisplay() {
    display.numAnterior.textContent = numUno + (operador ? " " + obtenerSigno(operador) : "");
    display.numActual.textContent = numDos;
  }
  
  // Función para obtener el signo del operador
  function obtenerSigno(operador) {
    switch (operador) {
      case "sumar":
        return "+";
      case "restar":
        return "-";
      case "multiplicar":
        return "x";
      case "dividir":
        return "÷";
      default:
        return "";
    }
  }  
  
  // Función para que el punto no se repita
  function agregarNumero(numero) {
    actualizarDisplay(numero);
  }  
  
  // Función para realizar las operaciones
  function calcular() {
    const num1 = parseFloat(numUno);
    const num2 = parseFloat(numDos);
    if (isNaN(num1) || isNaN(num2)) return;  
    let resultado = 0;
    switch (operador) {
      case "sumar":
        resultado = num1 + num2;
        break;
      case "restar":
        resultado = num1 - num2;
        break;
      case "multiplicar":
        resultado = num1 * num2;
        break;
      case "dividir":
        resultado = num1 / num2;
        break;
      default:
        return;
    }
  
    numUno = resultado.toString();
    numDos = "";
    operador = undefined;
    actualizarDisplay();
  }
  
  // Agregar event listeners a los botones
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const buttonValue = button.textContent;
      if (buttonValue === "." && display.numActual.textContent.includes(".")) return;
      agregarNumero(buttonValue);
      if (button.classList.contains("operador")) {
        if (operador && numDos) {
          calcular();
        }
        operador = button.value;
        numUno = numDos || numUno;
        numDos = "";
      } else {
        numDos += button.textContent;
      }
      actualizarDisplay();      
    });
  });

  clear.addEventListener("click", () => {
    numUno = "";
    numDos = "";
    operador = undefined;
    actualizarDisplay();
  });
  
  borrar.addEventListener("click", () => {
    numDos = numDos.toString().slice(0, -1);
    actualizarDisplay();
  });
  
  equalsButton.addEventListener("click", () => {
    calcular();
  });  