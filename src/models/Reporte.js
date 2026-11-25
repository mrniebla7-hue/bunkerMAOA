import mongoose from 'mongoose';

const ReporteSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  titulo: { type: String, required: true, trim: true },
  urgencia: { 
    type: String, 
    enum: ['Baja (Planificado)', 'Media (Requiere Atención)', 'Alta (Crítico / Inmediato)'],
    default: 'Media (Requiere Atención)' 
  },
  categoriaODS: { 
    type: String, 
    required: true,
    enum: [
      'Tecnología y Cómputo (ODS 4/9)',
      'Mobiliario Escolar (ODS 4)',
      'Infraestructura y Agua (ODS 6)',
      'Residuos y Limpieza (ODS 12)'
    ]
  },
  destinatario: {
    type: String,
    required: true,
    enum: ['Profesores / Jefes de Taller', 'Servicios Generales / Mantenimiento', 'Dirección / Administración']
  },
  ubicacion: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: String, enum: ['Pendiente', 'En Proceso', 'Resuelto'], default: 'Pendiente' },
  fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.models.Reporte || mongoose.model('Reporte', ReporteSchema);
