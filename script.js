// Esquema básico de la malla (ejemplo reducido; agrega los ramos reales según PDF)
const malla = [
  { sem: 1, ramos: [{ id: 'cal1', name: 'Cálculo I' }, { id: 'qui1', name: 'Química General' }] },
  { sem: 2, ramos: [{ id: 'cal2', name: 'Cálculo II', prereq: 'cal1' }, { id: 'qui2', name: 'Química Orgánica', prereq: 'qui1' }] },
  // ...
  { sem: 11, ramos: [{ id: 'tes', name: 'Trabajo de Título', prereq: 'todas' }] }
];

document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("malla-container");

  malla.forEach(({sem, ramos}) => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>Semestre ${sem}</h2><div class="ramos"></div>`;
    const rdiv = div.querySelector(".ramos");
    ramos.forEach(r => {
      const d = document.createElement("div");
      d.className = "ramo";
      d.dataset.id = r.id;
      if (r.prereq) d.dataset.prereq = r.prereq;
      d.textContent = r.name;
      rdiv.append(d);
    });
    cont.append(div);
  });

  const ramosEls = document.querySelectorAll(".ramo");
  const aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));

  function update() {
    ramosEls.forEach(el => {
      const id = el.dataset.id;
      const pre = el.dataset.prereq;
      el.classList.toggle("aprobado", aprobados.has(id));
      const locked = pre && pre !== 'todas' && !aprobados.has(pre);
      el.classList.toggle("bloqueado", locked);
      el.classList.toggle("aprobado", aprobados.has(id));
    });
  }

  ramosEls.forEach(el => el.addEventListener("click", () => {
    const id = el.dataset.id;
    if (el.classList.contains("bloqueado")) return;
    aprobados.has(id) ? aprobados.delete(id) : aprobados.add(id);
    localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
    update();
  }));

  update();
});

