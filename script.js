// Función para actualizar el total general
function actualizarTotal() {
    let total = 0;
    document.querySelectorAll(".line-total").forEach(item => {
      total += parseFloat(item.textContent);
    });
    document.getElementById("total").textContent = total.toFixed(2);
  }
  
  // Evento para agregar un nuevo servicio
  document.getElementById("addService").addEventListener("click", () => {
    const tableBody = document.querySelector("#servicesTable tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><input type="text" class="desc" placeholder="Servicio" /></td>
      <td><input type="number" class="qty" value="0" /></td>
      <td><input type="number" class="price" value="0" /></td>
      <td class="line-total">0.00</td>
      <td><button class="remove">❌</button></td>
    `;
    tableBody.appendChild(newRow);
  
    newRow.querySelector(".qty").addEventListener("input", actualizarLinea);
    newRow.querySelector(".price").addEventListener("input", actualizarLinea);
  
    newRow.querySelector(".remove").addEventListener("click", () => {
      newRow.remove();
      actualizarTotal();
    });
  });
  
  // Actualizar línea y total
  function actualizarLinea() {
    const row = this.closest("tr");
    const qty = parseFloat(row.querySelector(".qty").value) || 0;
    const price = parseFloat(row.querySelector(".price").value) || 0;
    const lineTotal = qty * price;
    row.querySelector(".line-total").textContent = lineTotal.toFixed(2);
    actualizarTotal();
  }
  
  // Asignar eventos al primer servicio
  document.querySelector(".qty").addEventListener("input", actualizarLinea);
  document.querySelector(".price").addEventListener("input", actualizarLinea);
  
  // Generación del PDF
  document.getElementById("generatePDF").addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;
  
    const nombre = document.getElementById("clienteNombre").value;
    const correo = document.getElementById("clienteEmail").value;
    const telefono = document.getElementById("clienteTelefono").value;
  
    const logo = new Image();
    logo.src = "logo circular con carisma para una empresa de jardinería y reformas, estilo moderno, colores verdes, nombre Difexis.png";
  
    logo.onload = function () {
      doc.addImage(logo, "PNG", 10, 10, 40, 40);
      generarContenidoPDF(doc, y);
    };
  
    logo.onerror = function () {
      console.error("Error al cargar el logo. Continuando sin logo.");
      generarContenidoPDF(doc, y);
    };
  });
  
  function generarContenidoPDF(doc, y) {
    doc.setFontSize(18);
    doc.setTextColor(46, 125, 50);
    doc.text("Cotización DIFEXIS - Jardinería y Reformas", 60, 20);
  
    y += 50;
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`Cliente: ${document.getElementById("clienteNombre").value}`, 20, y);
    y += 6;
    doc.text(`Correo: ${document.getElementById("clienteEmail").value}`, 20, y);
    y += 6;
    doc.text(`Teléfono: ${document.getElementById("clienteTelefono").value}`, 20, y);
    y += 10;
  
    doc.setFontSize(12);
    doc.setFillColor(200, 230, 201);
    doc.rect(20, y, 170, 8, "F");
    doc.text("Servicio", 22, y + 6);
    doc.text("Cant.", 100, y + 6);
    doc.text("Precio (€)", 120, y + 6);
    doc.text("Total (€)", 155, y + 6);
    y += 10;
  
    document.querySelectorAll("#servicesTable tbody tr").forEach(row => {
      const desc = row.querySelector(".desc").value;
      const qty = row.querySelector(".qty").value;
      const price = row.querySelector(".price").value;
      const total = row.querySelector(".line-total").textContent;
  
      doc.text(desc, 22, y);
      doc.text(`${qty}`, 100, y);
      doc.text(`€${price}`, 120, y);
      doc.text(`€${total}`, 155, y);
      y += 8;
    });
  
    y += 5;
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.text(`Total General: €${document.getElementById("total").textContent}`, 120, y);
  
    doc.save(`cotizacion_${document.getElementById("clienteNombre").value.replace(/\s+/g, '_')}.pdf`);
  }