
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

             initializePageScripts();             

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

  // JavaScript para la funcionalidad de movimiento
  function moveSelected(sourceId, destinationId) {
    const sourceList = document.getElementById(sourceId);
    const destinationList = document.getElementById(destinationId);

    // Recorre las opciones de la lista de origen de atrás hacia adelante
    for (let i = sourceList.options.length - 1; i >= 0; i--) {
      const option = sourceList.options[i];

      // Si la opción está seleccionada, muévela a la lista de destino
      if (option.selected) {
        destinationList.appendChild(option);
      }
    }
  }

  // Nueva función para filtrar
function filterListbox(filterId, listboxId) {
    const filterInput = document.getElementById(filterId).value.toLowerCase();
    const listbox = document.getElementById(listboxId);
    
    for (let i = 0; i < listbox.options.length; i++) {
        const option = listbox.options[i];
        const text = option.text.toLowerCase();
        
        // Muestra la opción si el texto de la opción incluye el texto del filtro
        if (text.includes(filterInput)) {
            option.style.display = 'block'; // Muestra el elemento
        } else {
            option.style.display = 'none'; // Oculta el elemento
        }
    }
}

// Función para seleccionar todos los elementos
function selectAll(listboxId) {
    const listbox = document.getElementById(listboxId);
    
    for (let i = 0; i < listbox.options.length; i++) {
        // Aseguramos que solo se seleccionen las opciones visibles
        if (listbox.options[i].style.display !== 'none') {
            listbox.options[i].selected = true;
        } else {
            listbox.options[i].selected = false;
        }
    }
}

function selectAllRows() {
    // 1. Obtener el estado del checkbox principal
    const selectAll = document.getElementById('selectAllCheckbox');
    const isChecked = selectAll.checked;

    // 2. Obtener todos los checkboxes de las filas
    const checkboxes = document.querySelectorAll('.row-checkbox');

    // 3. Iterar y cambiar el estado de cada checkbox de la fila
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });

    // 4. Actualizar el conteo de registros seleccionados
    updateSelectedCount();
}

function updateSelectedCount() {
    const checkboxes = document.querySelectorAll('.row-checkbox:checked');
    const selectedCountElement = document.getElementById('selectedCount');
    selectedCountElement.textContent = checkboxes.length;
}
// Esta función se puede ejecutar cuando la página cargue
function updateTotalRecords() {
    const rows = document.querySelectorAll('#tablaDocumentos tbody tr');
    const totalRecordsElement = document.getElementById('totalRecords');
    if (totalRecordsElement) {
        totalRecordsElement.textContent = rows.length;
    }
}

document.getElementById('tablaDocumentos').addEventListener('change', function(e) {
    if (e.target.classList.contains('row-checkbox')) {
        updateSelectedCount();
    }
    // Lógica para el checkbox de 'seleccionar todo'
    if (e.target.id === 'selectAllCheckbox') {
        const isChecked = e.target.checked;
        const checkboxes = document.querySelectorAll('.row-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        updateSelectedCount();
    }
});

function initializePageScripts() {
    // 1. Llama a la función que actualiza el conteo total de registros
    updateTotalRecords();
    updateSelectedCount();
    // 2. Si necesitas inicializar los checkboxes, hazlo aquí
    //    Por ejemplo, si tienes una función para seleccionar/deseleccionar todo
    //    inicializarCheckboxs();
    
    // 3. Cualquier otro script que dependa del HTML cargado
    //    Por ejemplo, inicializar un plugin de datatable o un carrusel
    
    // 4. Si la página cargada es el formulario de empleado, inicializa el botón
    const currentPage = document.getElementById("content-area").querySelector("[data-page-type]");
    if (currentPage && currentPage.getAttribute('data-page-type') === 'formulario-empleado') {
        inicializarBotonHoy();
    }
}