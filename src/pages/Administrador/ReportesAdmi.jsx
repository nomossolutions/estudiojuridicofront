import { useEffect, useState } from "react";
import Boton from "../../components/Boton";
import { jsPDF } from "jspdf";
import Tablageneral from "../../components/TablaGeneral";
import { obtenerMovimientosAgenda } from "../../helper/reporte.Api";


const RegistroAdmin = () => {
  const columnas = [
    "Nº",
    "Nombre Cliente",
    "Tipo de Evento",
    "Fecha",
  ];
  const claves = ["nombre", "tipoEvento", "fecha"];
  const [filas, setFilas] = useState([]);
  useEffect(() => {
    const fetchMovimientos = async () => {
      const data = await obtenerMovimientosAgenda();
      setFilas(data);
    };
    fetchMovimientos();
  }, []);


  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Historial de Movimientos - Agenda", 20, 20);
    doc.setFontSize(10);
    doc.text("Nº", 10, 30);
    doc.text("Nombre Cliente", 25, 30);
    doc.text("Tipo de Evento", 80, 30);
    doc.text("Fecha", 140, 30);

    let y = 40;
    filas.forEach((mov, index) => {
      doc.text(`${index + 1}`, 10, y);
      doc.text(mov.nombre.substring(0, 25), 25, y);
      doc.text(mov.tipoEvento, 80, y);
      doc.text(mov.fecha, 140, y);
      y += 8;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("movimientos_agenda.pdf");
  };


  return (
    <>
      <div className="tabla-scroll">
        <Tablageneral
          columnas={columnas}
          filas={filas}
          claves={claves}
        />
      </div>

      <div className="d-flex justify-content-end mt-3">
         <Boton action="descargarPdf" onClick={() =>  generarPDF()} />
      </div>
    </>
  );
};
export default RegistroAdmin;
