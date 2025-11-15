// Botón hamburguesa
const btn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu-horizontal");
btn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Evento para mostrar mensaje enviado en formulario contacto
const contactoForm = document.getElementById("formularioContacto");
if (contactoForm) {
  contactoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const mensaje = document.getElementById("mensajeEnviado");
    mensaje.style.display = "block";
    this.reset();
    setTimeout(() => {
      mensaje.style.display = "none";
    }, 5000);
  });
}

const formulario = document.forms["frm"];

formulario.addEventListener("submit", function (event) {
  const nombres = formulario.elements["nombres"].value.trim();
  const apellidos = formulario.elements["apellidos"].value.trim();
  const email = formulario.elements["email"].value.trim();
  const telefono = formulario.elements["telefono"].value.trim();

  let errores = [];

  // Validación básica de campos vacíos
  if (!nombres) errores.push("Nombres");
  if (!apellidos) errores.push("Apellidos");
  if (!email) errores.push("Correo");
  if (!telefono) errores.push("Teléfono");

  // Validación del teléfono
  const telefonoValido = /^[0-9]{9}$/.test(telefono);
  if (!telefonoValido) {
    errores.push("Teléfono (debe tener exactamente 9 números)");
  }

  // Validación del correo
  if (!validateEmail(email)) {
    errores.push("Correo electrónico inválido");
  }

  // Si hay errores, cancelar envío y mostrar alertas
  if (errores.length > 0) {
    event.preventDefault();
    alert("Corrige los siguientes errores:\n- " + errores.join("\n- "));
    return;
  }

  // Confirmación antes de enviar
  const confirmacion = confirm("¿Deseas enviar el formulario?");
  if (!confirmacion) {
    event.preventDefault();
    return;
  }

  // Mostrar mensaje de éxito (si existe)
  const mensaje = document.getElementById("mensajeEnviado");
  if (mensaje) {
    mensaje.style.display = "block";
    setTimeout(() => {
      mensaje.style.display = "none";
    }, 5000);
  }

  // Limpiar formulario
  formulario.reset();
});

// Validar correo electrónico
function validateEmail(correo) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return re.test(String(correo).toLowerCase());
}

// Registro de medicamentos (User Story)
let medicamentos = [];
const medForm = document.getElementById("medForm");
if (medForm) {
  medForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("medicamento").value;
    const categoria = document.getElementById("categoria").value;
    const stock = parseInt(document.getElementById("stock").value);

    if (!nombre || !categoria || isNaN(stock)) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    medicamentos.push({ nombre, categoria, stock });
    mostrarMedicamentos();
    this.reset();
  });
}

function mostrarMedicamentos() {
  const lista = document.getElementById("listaMedicamentos");
  lista.innerHTML = "";
  medicamentos.forEach((med) => {
    const li = document.createElement("li");
    li.textContent = `${med.nombre} (${med.categoria}) - Stock: ${med.stock}`;
    lista.appendChild(li);
  });
}
