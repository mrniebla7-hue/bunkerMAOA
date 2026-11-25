import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import {
  Radio,
  BarChart3,
  FilePlus,
  Database,
  HelpCircle,
  FileText,
  User,
  LogOut,
  Phone,
  MessageSquare,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  Laptop,
  Droplets,
  Armchair,
  Wrench,
  ExternalLink,
  Award,
  Sparkles,
  Server,
  TrendingUp
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from "recharts";

const SUPPORT_PHONE = "6571395742";
const SUPPORT_PHONE_DISPLAY = "+52 (657) 139-5742";

const INITIAL_REPORTS = [
  {
    id: "1",
    codigo: "#MAOA-2026-8492",
    titulo: "Faltan 12 Computadoras y Teclados en Lab 3",
    categoria: "Computadoras / Laptops",
    urgencia: "Alta (Crítico)",
    ubicacion: "Laboratorio de Cómputo 3 - MAOA",
    descripcion: "Equipos insuficientes para prácticas de desarrollo web del turno vespertino.",
    estado: "Pendiente",
    autor: "operador.maoa@maoa.edu.mx",
    color: "#00f0ff"
  },
  {
    id: "2",
    codigo: "#MAOA-2026-3105",
    titulo: "Fuga y Falta de Agua en Sanitarios Edificio B",
    categoria: "Agua / Baños / Fugas",
    urgencia: "Alta (Crítico)",
    ubicacion: "Baños Planta Baja - Edificio B",
    descripcion: "Sin presión en lavabos y fuga constante en llave principal.",
    estado: "En Proceso",
    autor: "brigada.agua@maoa.edu.mx",
    color: "#3b82f6"
  },
  {
    id: "3",
    codigo: "#MAOA-2026-7721",
    titulo: "Acumulación de PET y Residuos en Explanada",
    categoria: "Basura / Residuos",
    urgencia: "Media",
    ubicacion: "Explanada Cívica Principal",
    descripcion: "Contenedores de reciclaje saturados después del receso.",
    estado: "Resuelto",
    autor: "ods12.verde@maoa.edu.mx",
    color: "#10b981"
  },
  {
    id: "4",
    codigo: "#MAOA-2026-9042",
    titulo: "Pizarrón Estrellado y 6 Mesabancos Dañados",
    categoria: "Pizarrones / Mobiliario",
    urgencia: "Media",
    ubicacion: "Aula A-14",
    descripcion: "El pizarrón blanco presenta grietas y faltan paletas en butacas.",
    estado: "Pendiente",
    autor: "jefe.grupo@maoa.edu.mx",
    color: "#a855f7"
  },
  {
    id: "5",
    codigo: "#MAOA-2026-1123",
    titulo: "Reparación de Cableado HDMI y Proyector",
    categoria: "Mantenimiento General",
    urgencia: "Baja",
    ubicacion: "Sala Audiovisual 1",
    descripcion: "Falso contacto en la caja de conexiones de pared.",
    estado: "En Proceso",
    autor: "soporte.taller@maoa.edu.mx",
    color: "#f59e0b"
  }
];

const CATEGORY_COLORS = {
  "Computadoras / Laptops": "#00f0ff",
  "Pizarrones / Mobiliario": "#a855f7",
  "Agua / Baños / Fugas": "#3b82f6",
  "Basura / Residuos": "#10b981",
  "Mantenimiento General": "#f59e0b"
};

const CATEGORY_ICONS = {
  "Computadoras / Laptops": Laptop,
  "Pizarrones / Mobiliario": Armchair,
  "Agua / Baños / Fugas": Droplets,
  "Basura / Residuos": Trash2,
  "Mantenimiento General": Wrench
};

export default function Dashboard({ initialTab = "dashboard" }) {
  const navigate = useNavigate();

  const savedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("maoa_user") || "null");
    } catch {
      return null;
    }
  }, []);

  const [user] = useState(
    savedUser || {
      isAuthenticated: true,
      nombre: "Operador MAOA",
      email: "operador@maoa.edu.mx",
      rol: "Operador Principal MAOA",
      plantel: "Sistema Central • MAOA"
    }
  );

  const [activeTab, setActiveTab] = useState(initialTab);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "Computadoras / Laptops",
    urgencia: "Alta (Crítico)",
    ubicacion: "Edificio A - MAOA",
    descripcion: ""
  });

  const [helpForm, setHelpForm] = useState({
    asunto: "Soporte Técnico / Urgencia en Red MAOA",
    mensaje: ""
  });

  const showToast = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("maoa_user");
    navigate("/login");
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.descripcion.trim()) return;

    const newReport = {
      id: Date.now().toString(),
      codigo: `#MAOA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      titulo: formData.titulo,
      categoria: formData.categoria,
      urgencia: formData.urgencia,
      ubicacion: formData.ubicacion,
      descripcion: formData.descripcion,
      estado: "Pendiente",
      autor: user.email,
      color: CATEGORY_COLORS[formData.categoria] || "#00f0ff"
    };

    setReports([newReport, ...reports]);
    showToast(`Reporte ${newReport.codigo} publicado en la red MAOA.`);
    setFormData({
      titulo: "",
      categoria: "Computadoras / Laptops",
      urgencia: "Alta (Crítico)",
      ubicacion: "Edificio A - MAOA",
      descripcion: ""
    });
    setActiveTab("dashboard");
  };

  const handleDeleteReport = (id) => {
    setReports(reports.filter((r) => r.id !== id));
    showToast("Reporte eliminado correctamente.", "info");
  };

  const handleStatusChange = (id, newStatus) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, estado: newStatus } : r)));
    showToast(`Estado actualizado a: ${newStatus}`);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!helpForm.mensaje.trim()) {
      showToast("Escribe tu mensaje antes de enviarlo.", "error");
      return;
    }
    const texto = `Hola, solicito ayuda desde el sistema *BÚNKER MAOA (Proyecto Tofu)*.\n\n*Operador:* ${user.nombre}\n*Correo:* ${user.email}\n*Asunto:* ${helpForm.asunto}\n*Mensaje:* ${helpForm.mensaje}`;
    const url = `https://wa.me/52${SUPPORT_PHONE}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
    showToast("Abriendo WhatsApp para mandar tu mensaje...");
    setHelpForm({ ...helpForm, mensaje: "" });
  };

  const categoryStats = useMemo(() => {
    return Object.keys(CATEGORY_COLORS).map((cat) => ({
      name: cat,
      shortName: cat.split(" / ")[0],
      count: reports.filter((r) => r.categoria === cat).length,
      color: CATEGORY_COLORS[cat]
    }));
  }, [reports]);

  const filteredReports =
    filterCategory === "Todas"
      ? reports
      : reports.filter((r) => r.categoria === filterCategory);

  return (
    <div className="min-h-screen bg-[#04070f] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col">
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border bg-[#0b1528]/95 border-cyan-500/50 text-cyan-200 backdrop-blur-md">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
          <span className="text-sm font-medium">{notification.msg}</span>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-[#070c18]/90 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white font-mono">
                  BÚNKER <span className="text-cyan-400">MAOA</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  TOFU PRO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Red Central de Mantenimiento & Reparaciones MAOA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("ayuda")}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
            >
              <MessageSquare className="w-4 h-4" />
              Pedir Ayuda
            </button>

            <button
              onClick={() => setActiveTab("perfil")}
              className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                {user.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-slate-200 leading-none">{user.nombre}</div>
                <div className="text-[10px] text-cyan-400 leading-tight">{user.email}</div>
              </div>
            </button>

            <button
              onClick={handleLogout}
              title="Cerrar Sesión"
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <nav className="flex space-x-2 py-2 border-t border-slate-800/60">
            {[
              { id: "dashboard", label: "Panel & Gráfica", icon: BarChart3 },
              { id: "reportar", label: "Reportar Reparación", icon: FilePlus },
              { id: "quienes", label: "Quiénes Somos", icon: ShieldCheck },
              { id: "ayuda", label: "Pedir Ayuda & WhatsApp", icon: HelpCircle },
              { id: "perfil", label: "Mi Perfil MAOA", icon: User },
              { id: "condiciones", label: "Condiciones de Uso", icon: FileText },
              { id: "mongodb", label: "Base de Datos", icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#0c182e] via-[#0e1f3d] to-[#0a1326] border border-cyan-500/20 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" /> Sesión Activa: {user.email}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Hola, {user.nombre}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Supervisa los reportes activos del sistema MAOA o registra una nueva solicitud de reparación en cómputo, agua, basura, pizarrones o mantenimiento.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("reportar")}
                  className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
                >
                  <FilePlus className="w-4 h-4" /> Nuevo Reporte
                </button>
                <button
                  onClick={() => setActiveTab("ayuda")}
                  className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-400" /> Contactar Soporte
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0a101f] border border-slate-800/90 p-5 rounded-2xl">
                <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                  <span>TOTAL REPORTES</span>
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2">{reports.length}</div>
                <div className="text-xs text-cyan-400 mt-1">Incidencias en el sistema</div>
              </div>

              <div className="bg-[#0a101f] border border-slate-800/90 p-5 rounded-2xl">
                <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                  <span>PENDIENTES</span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-3xl font-black text-rose-400 mt-2">
                  {reports.filter((r) => r.estado === "Pendiente").length}
                </div>
                <div className="text-xs text-slate-400 mt-1">En espera de atención</div>
              </div>

              <div className="bg-[#0a101f] border border-slate-800/90 p-5 rounded-2xl">
                <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                  <span>EN REPARACIÓN</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-amber-400 mt-2">
                  {reports.filter((r) => r.estado === "En Proceso").length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Brigada trabajando</div>
              </div>

              <div className="bg-[#0a101f] border border-slate-800/90 p-5 rounded-2xl">
                <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                  <span>RESUELTOS</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400 mt-2">
                  {reports.filter((r) => r.estado === "Resuelto").length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Completados con éxito</div>
              </div>
            </div>

            <div className="bg-[#0a101f] border border-slate-800/90 p-6 sm:p-8 rounded-3xl shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    Estadísticas de Reparación por Especialidad
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Conteo en tiempo real de reportes registrados en cada área del sistema MAOA
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 self-start">
                  Actualización Automática
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryStats} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis
                        dataKey="shortName"
                        stroke="#64748b"
                        tick={{ fill: "#cbd5e1", fontSize: 12, fontWeight: 600 }}
                      />
                      <YAxis
                        stroke="#64748b"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.03)" }}
                        contentStyle={{
                          backgroundColor: "#060a14",
                          borderColor: "#1e293b",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "12px"
                        }}
                      />
                      <Bar dataKey="count" name="Reportes" radius={[10, 10, 0, 0]} barSize={48}>
                        {categoryStats.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="lg:col-span-4 space-y-3 bg-[#060a14] p-5 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Desglose por Área
                  </div>
                  {categoryStats.map((item) => {
                    const Icon = CATEGORY_ICONS[item.name] || Wrench;
                    return (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a101f] border border-slate-800/60"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="p-1.5 rounded-lg"
                            style={{ backgroundColor: `${item.color}15`, color: item.color }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-medium text-slate-200">{item.shortName}</span>
                        </div>
                        <span
                          className="text-sm font-black font-mono px-2.5 py-0.5 rounded-md"
                          style={{ backgroundColor: `${item.color}15`, color: item.color }}
                        >
                          {item.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-[#0a101f] border border-slate-800/90 rounded-3xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Bitácora de Reparaciones Activas</h3>
                  <p className="text-xs text-slate-400">
                    Consulta lo que han reportado los operadores y actualiza su estado
                  </p>
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-[#050811] border border-slate-700 text-cyan-300 rounded-xl px-4 py-2 text-xs font-semibold outline-none"
                >
                  <option value="Todas">Todas las áreas ({reports.length})</option>
                  {Object.keys(CATEGORY_COLORS).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-3 px-4">FOLIO</th>
                      <th className="py-3 px-4">FALLA / REPARACIÓN</th>
                      <th className="py-3 px-4">ÁREA</th>
                      <th className="py-3 px-4">ESTADO</th>
                      <th className="py-3 px-4 text-center">ELIMINAR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {filteredReports.map((item) => {
                      const Icon = CATEGORY_ICONS[item.categoria] || Wrench;
                      return (
                        <tr key={item.id} className="hover:bg-slate-900/40 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                            {item.codigo}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-sm">{item.titulo}</div>
                            <div className="text-slate-400 mt-0.5">{item.descripcion}</div>
                            <div className="text-[11px] text-slate-500 mt-1">
                              📍 {item.ubicacion} • Reportado por:{" "}
                              <span className="text-cyan-400/80">{item.autor}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold border"
                              style={{
                                backgroundColor: `${item.color}15`,
                                borderColor: `${item.color}40`,
                                color: item.color
                              }}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {item.categoria}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={item.estado}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              className="bg-[#050811] border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 font-semibold outline-none"
                            >
                              <option value="Pendiente">🔴 Pendiente</option>
                              <option value="En Proceso">🟡 En Proceso</option>
                              <option value="Resuelto">🟢 Resuelto</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => handleDeleteReport(item.id)}
                              className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reportar" && (
          <div className="max-w-2xl mx-auto bg-[#0a101f] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FilePlus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Nuevo Reporte de Reparación</h2>
                <p className="text-xs text-slate-400">
                  Se registrará a nombre de tu cuenta:{" "}
                  <span className="text-cyan-400">{user.email}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Título del Problema o Reparación *
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej. Monitor no enciende / Fuga de agua / Pizarrón roto"
                  className="w-full bg-[#050811] border border-slate-700 focus:border-cyan-500 rounded-xl p-3 text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Área / Especialidad *
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-700 focus:border-cyan-500 rounded-xl p-3 text-cyan-300 font-semibold outline-none"
                  >
                    <option value="Computadoras / Laptops">💻 Computadoras / Laptops</option>
                    <option value="Agua / Baños / Fugas">💧 Agua / Baños / Fugas</option>
                    <option value="Basura / Residuos">♻️ Basura / Residuos</option>
                    <option value="Pizarrones / Mobiliario">🪑 Pizarrones / Mobiliario</option>
                    <option value="Mantenimiento General">🛠️ Mantenimiento General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ubicación Exacta *
                  </label>
                  <input
                    type="text"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    placeholder="Ej. Edificio B - Área Central"
                    className="w-full bg-[#050811] border border-slate-700 focus:border-cyan-500 rounded-xl p-3 text-white outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Descripción Detallada de la Falla *
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows="4"
                  placeholder="Describe qué pieza o servicio se necesita reparar..."
                  className="w-full bg-[#050811] border border-slate-700 focus:border-cyan-500 rounded-xl p-3 text-white outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition"
              >
                Publicar Reporte en el Búnker MAOA
              </button>
            </form>
          </div>
        )}

        {activeTab === "quienes" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-[#0a101f] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                🛡️ Transparencia y Confianza del Sistema MAOA
              </div>
              <h2 className="text-2xl font-black text-white">¿Quiénes Somos?</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Somos la célula de desarrollo y mantenimiento tecnológico del{" "}
                <span className="text-cyan-400 font-bold">Sistema MAOA</span>. Nuestro equipo está
                enfocado en la construcción de soluciones digitales seguras y eficientes para
                optimizar las instalaciones, salvaguardar los recursos y garantizar la conectividad de
                toda la red.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0a101f] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
                  01
                </div>
                <h3 className="text-lg font-bold text-white">Confidencialidad de Datos</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Comprendemos la importancia de la información y la seguridad. Por ello, implementamos
                  estrictos protocolos de acceso exclusivo para operadores autorizados en el
                  ecosistema MAOA.
                </p>
              </div>

              <div className="bg-[#0a101f] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono">
                  02
                </div>
                <h3 className="text-lg font-bold text-white">Para Ganar Tu Confianza</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cada reporte e incidencia se almacena de forma transparente en nuestra base de datos
                  (MongoDB Atlas), permitiendo un rastreo claro sin vulnerar la privacidad ni
                  comercializar información.
                </p>
              </div>
            </div>

            <div className="bg-[#0a101f] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-cyan-400 font-mono">
                  Políticas de Cuidado y Privacidad de la Información
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Compromiso oficial de manejo de datos del Búnker MAOA
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800">
                  <h4 className="font-bold text-white mb-1">🔐 1. Recopilación Mínima y Necesaria</h4>
                  <p>
                    Únicamente solicitamos los datos indispensables para la gestión de reportes de
                    mantenimiento (nombre, correo y ubicación de la falla), evitando el
                    almacenamiento de información personal innecesaria.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800">
                  <h4 className="font-bold text-white mb-1">🛡️ 2. Restricción de Acceso y Cifrado</h4>
                  <p>
                    Tus credenciales de acceso y registros de actividad están protegidos contra
                    accesos no autorizados. Ningún agente externo tiene facultades para visualizar
                    contraseñas o datos sensibles.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800">
                  <h4 className="font-bold text-white mb-1">🤝 3. Uso Exclusivo Operativo</h4>
                  <p>
                    La información proporcionada se emplea única y exclusivamente para coordinar las
                    brigadas de reparación y solución de incidencias dentro del ecosistema MAOA. Jamás
                    será cedida a terceros.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ayuda" && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0d1c33] to-[#0a101f] border border-emerald-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Phone className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white">Centro de Ayuda Directa MAOA</h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ¿Tienes una emergencia con equipos, fugas o problemas con tu cuenta en el sistema
                  MAOA? Comunícate directamente a nuestra línea de atención.
                </p>

                <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800 space-y-2">
                  <div className="text-[11px] text-slate-400 uppercase font-bold">
                    Número Oficial de Soporte y WhatsApp
                  </div>
                  <div className="text-lg font-mono font-black text-emerald-400">
                    {SUPPORT_PHONE_DISPLAY}
                  </div>
                  <div className="text-xs text-slate-400">
                    Horario de atención: Lunes a Viernes • 7:00 AM - 8:00 PM
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <a
                  href={`https://wa.me/52${SUPPORT_PHONE}?text=${encodeURIComponent(
                    "Hola, necesito ayuda con el sistema Búnker MAOA - Proyecto Tofu."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  Abrir Chat Directo en WhatsApp
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`tel:+52${SUPPORT_PHONE}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  Llamar por Teléfono Ahora
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0a101f] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1">
                Mandar Mensaje al Número de Soporte
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Redacta tu consulta y se enviará directo con tus datos al {SUPPORT_PHONE_DISPLAY}
              </p>

              <form onSubmit={handleSendWhatsApp} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Motivo de la Ayuda
                  </label>
                  <select
                    value={helpForm.asunto}
                    onChange={(e) => setHelpForm({ ...helpForm, asunto: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-700 rounded-xl p-3 text-xs text-cyan-300 font-semibold outline-none"
                  >
                    <option value="Soporte Técnico / Urgencia en Red MAOA">
                      🚨 Urgencia de Reparación
                    </option>
                    <option value="Problema con mi Cuenta de Operador">
                      🔐 Problema con mi Cuenta
                    </option>
                    <option value="Solicitud de Equipamiento">
                      💻 Solicitud de Equipamiento
                    </option>
                    <option value="Duda sobre el Proyecto Tofu">
                      💡 Duda General sobre Proyecto Tofu
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tu Mensaje *
                  </label>
                  <textarea
                    value={helpForm.mensaje}
                    onChange={(e) => setHelpForm({ ...helpForm, mensaje: e.target.value })}
                    rows="5"
                    placeholder="Escribe aquí en qué podemos ayudarte..."
                    className="w-full bg-[#050811] border border-slate-700 focus:border-emerald-500 rounded-xl p-3 text-white outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  ENVIAR MENSAJE AL {SUPPORT_PHONE_DISPLAY}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "perfil" && (
          <div className="max-w-2xl mx-auto bg-[#0a101f] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-cyan-500/20">
                {user.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="text-center sm:text-left space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Award className="w-3.5 h-3.5" /> Operador Verificado MAOA
                </div>
                <h2 className="text-2xl font-bold text-white">{user.nombre}</h2>
                <p className="text-sm text-cyan-400 font-mono">{user.email}</p>
                <p className="text-xs text-slate-400">{user.plantel}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-xs">
              <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800">
                <div className="text-slate-400 mb-1">Rol en la Plataforma</div>
                <div className="font-bold text-white text-sm">{user.rol}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800">
                <div className="text-slate-400 mb-1">Mis Reportes Enviados</div>
                <div className="font-bold text-cyan-400 text-sm">
                  {reports.filter((r) => r.autor === user.email).length} propios • {reports.length}{" "}
                  totales
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleLogout}
                className="px-5 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión / Cambiar Cuenta
              </button>
            </div>
          </div>
        )}

        {activeTab === "condiciones" && (
          <div className="max-w-3xl mx-auto bg-[#0a101f] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Términos, Condiciones y Políticas de Uso
                </h2>
                <p className="text-xs text-slate-400">
                  Normativa Oficial del Sistema Búnker MAOA • Proyecto Tofu
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800/80">
                <h3 className="font-bold text-cyan-400 mb-1">
                  1. Propósito del Sistema de Gestión
                </h3>
                <p>
                  La plataforma Búnker MAOA (Proyecto Tofu) está diseñada exclusivamente para
                  reportar, dar seguimiento y gestionar reparaciones de equipo de cómputo,
                  instalaciones, residuos y mantenimiento general dentro de la red.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800/80">
                <h3 className="font-bold text-cyan-400 mb-1">
                  2. Uso Responsable de Reportes y Cuenta
                </h3>
                <p>
                  Cada operador que inicia sesión se compromete a registrar información verídica y
                  detallada sobre las fallas detectadas, evitando reportes falsos o duplicados en el
                  sistema.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800/80">
                <h3 className="font-bold text-cyan-400 mb-1">
                  3. Privacidad de Datos y Soporte Directo
                </h3>
                <p>
                  Los correos y mensajes enviados a través del apartado de Ayuda y WhatsApp (
                  {SUPPORT_PHONE_DISPLAY}) se utilizan únicamente para coordinar la atención técnica
                  con los operadores y personal autorizado de MAOA.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mongodb" && (
          <div className="space-y-4">
            <div className="bg-[#0a101f] border border-purple-500/30 p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Server className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Cluster MongoDB Atlas • TOFU_DB
                  </h3>
                  <p className="text-xs text-slate-400">
                    Colección: reportes_reparacion_maoa ({reports.length} documentos)
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {reports.map((doc) => (
                <div key={doc.id} className="bg-[#050811] border border-slate-800 p-4 rounded-2xl">
                  <pre className="text-cyan-300 overflow-x-auto">
{`{
  "_id": "${doc.id}8f9a2b",
  "codigo": "${doc.codigo}",
  "titulo": "${doc.titulo}",
  "categoria": "${doc.categoria}",
  "ubicacion": "${doc.ubicacion}",
  "estado": "${doc.estado}",
  "autor": "${doc.autor}"
}`}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 bg-[#060a14] py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono">
            <span className="text-cyan-400 font-bold">[ BÚNKER MAOA ]</span> • Proyecto Tofu © 2026
          </div>
          <div className="flex items-center gap-6">
            <Link to="/quienes-somos" className="hover:text-cyan-400 transition">
              Quiénes Somos
            </Link>
            <Link to="/terminos" className="hover:text-cyan-400 transition">
              Términos
            </Link>
            <Link to="/condiciones" className="hover:text-cyan-400 transition">
              Condiciones de Uso
            </Link>
            <button
              onClick={() => setActiveTab("ayuda")}
              className="hover:text-emerald-400 transition"
            >
              Pedir Ayuda ({SUPPORT_PHONE_DISPLAY})
            </button>
            <button onClick={() => setActiveTab("perfil")} className="hover:text-white transition">
              Perfil
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
 