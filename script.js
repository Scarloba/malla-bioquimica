const malla = [/* Pegaremos aquí la malla completa, desde sem 1 a 11 */];

// Cargar estado desde localStorage
const aprobados = JSON.parse(localStorage.getItem("aprobados") || "{}");

// Verifica si un ramo tiene todos sus prerrequisitos aprobados
function estaDesbloqueado(prereq) {
  if (!prereq) return true;
  return prereq.split(",").every(id => aprobados[id]);
}

// Renderiza la malla completa
function renderMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  malla.forEach(semestre => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestre.sem}`;
    semDiv.appendChild(titulo);

    const ramosDiv = document.createElement("div");
    ramosDiv.className = "ramos";

    semestre.ramos.forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo.name;

      const desbloqueado = estaDesbloqueado(ramo.prereq);
      const aprobado = aprobados[ramo.id];

      if (aprobado) {
        div.classList.add("aprobado");
      } else if (!desbloqueado) {
        div.classList.add("bloqueado");
      }

      div.onclick = () => {
        if (!desbloqueado) return;
        aprobados[ramo.id] = !aprobados[ramo.id];
        localStorage.setItem("aprobados", JSON.stringify(aprobados));
        renderMalla(); // recargar para actualizar colores y desbloqueos
      };

      ramosDiv.appendChild(div);
    });

    semDiv.appendChild(ramosDiv);
    container.appendChild(semDiv);
  });
}

// Ejecutar al cargar la página
renderMalla();
