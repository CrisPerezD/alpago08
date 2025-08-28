document.addEventListener("click", function (e) {
    const link = e.target.closest("[data-page]");
    if (!link) return;

    e.preventDefault();
    const page = link.getAttribute("data-page");

    console.log("Cargando página:", page);

    fetch(page)
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar: " + page);
            return response.text();
        })
        .then(html => {
            document.getElementById("content-area").innerHTML = html;

            // Si usas feather icons, refrescar iconos
            if (window.feather) {
                feather.replace();
            }

            // 🔹 Si la página cargada es el formulario de empleado
            if (page.includes("formulario-empleado.html")) {
                inicializarBotonHoy(); // Aquí sí inicializamos el botón
            }
        })
        .catch(err => console.error(err));
});

function inicializarBotonHoy() {
    const btnHoy = document.getElementById("btnHoy");
    const fechaIngreso = document.getElementById("fechaIngreso");

    if (btnHoy && fechaIngreso) {
        btnHoy.addEventListener("click", function () {
            const hoy = new Date();
            const yyyy = hoy.getFullYear();
            const mm = String(hoy.getMonth() + 1).padStart(2, '0');
            const dd = String(hoy.getDate()).padStart(2, '0');
            fechaIngreso.value = `${yyyy}-${mm}-${dd}`;
        });
    }
}
