import { useState, useEffect } from 'react';
import { dispositivosService, historialService } from '../services/api';

const Reportes = () => {
  const [dataAExportar, setDataAExportar] = useState([]);
  const [tipoReporte, setTipoReporte] = useState('dispositivos');

  useEffect(() => {
    cargarDatos();
  }, [tipoReporte]);

  const cargarDatos = async () => {
    try {
        if(tipoReporte === 'dispositivos') {
            const res = await dispositivosService.getAll();
            setDataAExportar(res.data);
        } else {
            const res = await historialService.getAll();
            setDataAExportar(res.data);
        }
    } catch (e) {
        console.error(e);
    }
  };

  const simularDescargaExcel = () => {
      // En un entorno de producción, aquí se usaría la librería 'xlsx'
      // import * as XLSX from 'xlsx';
      // const ws = XLSX.utils.json_to_sheet(dataAExportar);
      // const wb = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(wb, ws, "Reporte");
      // XLSX.writeFile(wb, `Reporte_DeviceGuard_${Date.now()}.xlsx`);
      alert("¡Simulación exitosa!\nBajo un entorno de producción, aquí se descargará el documento Excel con los " + dataAExportar.length + " registros de " + tipoReporte + ".");
  };

  const simularDescargaPDF = () => {
      // En un entorno de producción, aquí se usaría 'jspdf' y 'jspdf-autotable'
      alert("¡Simulación exitosa!\nBajo un entorno de producción, aquí se descargará el documento PDF.");
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' }}>Generación de Reportes</h1>
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
         <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Opciones de Exportación</h2>
         
         <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '10px' }}>Fuente de Datos:</label>
            <select 
               value={tipoReporte} 
               onChange={(e) => setTipoReporte(e.target.value)}
               style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '300px', outline: 'none' }}
            >
                <option value="dispositivos">Inventario Actual de Dispositivos</option>
                <option value="historial">Historial Global de Movimientos e Incidencias</option>
            </select>
         </div>

         <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
             <button 
                onClick={simularDescargaExcel}
                style={{ padding: '12px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
             >
                Descargar Excel (.xlsx)
             </button>
             
             <button 
                onClick={simularDescargaPDF}
                style={{ padding: '12px 24px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
             >
                Descargar Archivo PDF
             </button>
         </div>
         
         <div style={{ marginTop: '40px', padding: '16px', backgroundColor: '#f0f4ff', borderRadius: '8px', color: '#3a57e8', fontSize: '0.9rem' }}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>Previsualización de Reporte</strong>
            Actualmente seleccionaste el set de datos de <strong>{tipoReporte}</strong> con un total de <strong>{dataAExportar.length}</strong> registros listos para exportar.
         </div>
      </div>
    </div>
  );
};

export default Reportes;
