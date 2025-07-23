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

const malla = [
  {
    sem: 1,
    ramos: [
      { id: "intro_fp", name: "Introducción a la formación profesional" },
      { id: "fisica_elem", name: "Elementos de física para ingeniería" },
      { id: "mat_fund", name: "Fundamentos de matemáticas para ingeniería" },
      { id: "desarrollo_com", name: "Desarrollo integral y comunicación para ingeniería" },
      { id: "antro_cris", name: "Antropología cristiana" },
    ],
  },
  {
    sem: 2,
    ramos: [
      { id: "quimica_ing", name: "Química para ingeniería" },
      { id: "balance_masa", name: "Balance de masa" },
      {
        id: "fisica_ing",
        name: "Física para la ingeniería",
        prereq: "fisica_elem,mat_fund",
      },
      {
        id: "calculo_diff",
        name: "Cálculo diferencial e integral",
        prereq: "mat_fund",
      },
    ],
  },
  {
    sem: 3,
    ramos: [
      { id: "quimica_org", name: "Química orgánica", prereq: "quimica_ing" },
      { id: "fisicoquimica_elem", name: "Elementos de físico química", prereq: "balance_masa" },
      { id: "calculo_varias", name: "Cálculo en varias variables", prereq: "calculo_diff" },
      { id: "comunicacion_ing", name: "Comunicación en ingeniería" },
      { id: "ingles1", name: "Inglés 1" },
      { id: "form_fund1", name: "Formación fundamental 1" },
    ],
  },
  {
    sem: 4,
    ramos: [
      { id: "bioq_microb", name: "Bioquímica microbiana", prereq: "quimica_org" },
      { id: "termo_proc", name: "Termodinámica de procesos", prereq: "fisicoquimica_elem" },
      { id: "mec_fluidos", name: "Mecánica de fluidos", prereq: "fisica_ing" },
      { id: "ecuaciones_dif", name: "Ecuaciones diferenciales", prereq: "calculo_varias" },
      { id: "economia", name: "Economía", prereq: "comunicacion_ing" },
    ],
  },
  {
    sem: 5,
    ramos: [
      { id: "ciencia_alimentos", name: "Ciencia de los alimentos", prereq: "bioq_microb" },
      { id: "microbiologia", name: "Microbiología", prereq: "bioq_microb" },
      { id: "termo_equilibrio", name: "Termodinámica de equilibrio", prereq: "termo_proc" },
      { id: "seguridad_industrial", name: "Seguridad industrial" },
      { id: "prog_metodos", name: "Programación y métodos numéricos", prereq: "ecuaciones_dif" },
      { id: "innovacion_emprend", name: "Innovación y emprendimiento", prereq: "comunicacion_ing" },
    ],
  },
  {
    sem: 6,
    ramos: [
      { id: "ingenieria_genetica", name: "Ingeniería genética", prereq: "microbiologia" },
      { id: "transferencia_masa", name: "Transferencia de masa", prereq: "termo_equilibrio" },
      { id: "transferencia_calor", name: "Transferencia de calor", prereq: "mec_fluidos" },
      { id: "equipos_procesos", name: "Equipos de procesos", prereq: "mec_fluidos" },
      { id: "taller_innovacion", name: "Taller de innovación y emprendimiento", prereq: "innovacion_emprend" },
      { id: "ingles2", name: "Inglés 2", prereq: "ingles1" },
      { id: "etica_cristiana", name: "Ética cristiana" },
    ],
  },
  {
    sem: 7,
    ramos: [
      { id: "operacion_procesos", name: "Operación de procesos alimentarios", prereq: "ciencia_alimentos" },
      {
        id: "diseno_reactores",
        name: "Diseño de reactores y aplicaciones a bioprocesos",
        prereq: "termo_equilibrio,transferencia_masa,transferencia_calor",
      },
      { id: "separaciones_bioprocesos", name: "Separaciones en bioprocesos", prereq: "mec_fluidos" },
      { id: "estadistica_ing", name: "Estadística para ingeniería" },
      { id: "ingles3", name: "Inglés 3", prereq: "ingles2" },
      { id: "form_fund2", name: "Formación fundamental 2" },
    ],
  },
  {
    sem: 8,
    ramos: [
      {
        id: "ingenieria_fermentaciones",
        name: "Ingeniería de fermentaciones",
        prereq: "diseno_reactores,operacion_procesos",
      },
      { id: "biocatalisis_enzimatica", name: "Biocatálisis enzimática", prereq: "diseno_reactores" },
      {
        id: "laboratorio_op_unitarias",
        name: "Laboratorio de operaciones unitarias",
        prereq: "transferencia_masa,transferencia_calor",
      },
      { id: "energia_electrica", name: "Energía eléctrica en la industria", prereq: "equipos_procesos" },
      { id: "control_calidad", name: "Control y aseguramiento de calidad", prereq: "estadistica_ing" },
      { id: "ingles4", name: "Inglés 4", prereq: "ingles3" },
      { id: "form_fund3", name: "Formación fundamental 3" },
    ],
  },
  {
    sem: 9,
    ramos: [
      { id: "ingenieria_ambiental", name: "Ingeniería ambiental", prereq: "ingenieria_fermentaciones" },
      { id: "formulacion_proyectos", name: "Formulación y evaluación de proyectos" },
      { id: "analisis_procesos", name: "Análisis de procesos", prereq: "transferencia_calor" },
      { id: "modelacion_control", name: "Modelación y control de procesos", prereq: "equipos_procesos" },
      { id: "taller_proyeccion_laboral", name: "Taller de proyección laboral" },
      { id: "optativo_1", name: "Optativo 1" },
    ],
  },
  {
    sem: 10,
    ramos: [
      { id: "taller_bioprocesos", name: "Taller de ingeniería de bioprocesos", prereq: "ingenieria_fermentaciones" },
      {
        id: "proyecto_ing1",
        name: "Proyecto de ingeniería 1",
        prereq: "formulacion_proyectos,analisis_procesos",
      },
      { id: "administracion_organizacion", name: "Administración y organización industrial" },
      { id: "optativo_2", name: "Optativo 2" },
    ],
  },
  {
    sem: 11,
    ramos: [
      { id: "proyecto_ing2", name: "Proyecto de ingeniería 2", prereq: "proyecto_ing1" },
      { id: "optativo_3", name: "Optativo 3" },
      { id: "optativo_4", name: "Optativo 4" },
    ],
  },
];

// Cargar estado desde localStorage
const aprobados = JSON.parse(localStorage.getItem("aprobados") || "{}");

function estaDesbloqueado(prereq) {
  if (!prereq) return true;
  return prereq.split(",").every((id) => aprobados[id]);
}

function renderMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  malla.forEach((semestre) => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestre.sem}`;
