import jsPDF from "jspdf";
import "jspdf-autotable";
import { current_date } from "@/util/date.util";
import { formatLista} from  './formatter'

export const exportPDF = (header, lista, params) => {
  var doc = new jsPDF();
  doc.setFontSize(12);
  doc.text("Lista de Actividades", doc.internal.pageSize.width / 2, 20, {
    align: "center",
  });

  doc.setLineWidth(0.4);
  doc.line(13, 23, doc.internal.pageSize.width - 12, 23);
  doc.setFontSize(9);
  doc.text("Cliente: " + (params.cliente || 'Todos'), 15, 28);
  doc.text(
    `Rango de Fecha: ${params.fechadesde} al ${params.fechahasta}`,
    15,
    34
  );
  doc.line(13, 37, doc.internal.pageSize.width - 12, 37);
  doc.autoTable({
    head: [['Fecha','Cliente','Sucursal','Solicitante','Conceptos','Comentario']],
    body: formatLista(lista),
    startY: 40,
    theme: "striped",
    columnStyles: {
      8: { halign: "right", fontStyle: "bold" },
    },
    bodyStyles: {
        fontSize: 8,
    },
    headStyles: {
        textColor: [0, 0, 0],
        fillColor: [255, 255, 255],
        fontSize: 8,
    },

    styles: {
      cellPadding: 0.7,
    },
    didParseCell: (data) => {
      if (data.row.index == lista.length - 1 && data.column.index == 0) {
        if (data.cell.raw === "Total") {
          data.row.cells[0].colSpan = 1;
          Object.entries(data.row.cells).forEach((v) => {
            v[1].styles.fontStyle = "bold";
          });
        }
      }
    },
  });
  doc.save(
    "LISTA DE ACTIVIDADES" + current_date() + ".pdf"
  );
};
