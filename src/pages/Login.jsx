import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Radio,
  HelpCircle,
  User,
  LogIn,
  Mail,
  Lock,
  GraduationCap
} from "lucide-react";

const SUPPORT_PHONE = "6571395742";
const SUPPORT_PHONE_DISPLAY = "+52 (657) 139-5742";

export default function Login() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginName, setLoginName] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.includes("@")) return;

    const cleanName =
      loginName.trim() ||
      loginEmail
        .split("@")[0]
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

    const activeUser = {
      isAuthenticated: true,
      nombre: cleanName,
      email: loginEmail.toLowerCase(),
      rol: "Operador Autorizado MAOA",
      plantel: "Sistema Central • MAOA"
    };

    localStorage.setItem("maoa_user", JSON.stringify(activeUser));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#04070f] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-[#0a101f]/90 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/50">
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0d1c36] via-[#091428] to-[#060b16] p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <GraduationCap className="w-4 h-4" /> Portal Oficial MAOA
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Radio className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-black text-white font-mono tracking-tight">
                  BÚNKER <span className="text-cyan-400">MAOA</span>
                </h1>
                <p className="text-[11px] text-slate-400 font-mono">Proyecto Tofu • v3.0</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              Bienvenido a la red central de reportes y mantenimiento del sistema MAOA. Inicia sesión con tus credenciales para visualizar estadísticas y registrar incidencias.
            </p>

            <ul className="space-y-2 text-xs text-slate-300 pt-1">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Equipos de Cómputo y Servidores
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" /> Suministro e Instalaciones
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Gestión de Residuos (ODS 12)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" /> Mobiliario e Infraestructura
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Soporte directo:</span>
            <span className="text-emerald-400 font-mono font-bold">{SUPPORT_PHONE_DISPLAY}</span>
          </div>
        </div>

        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white">
              {isRegisterMode ? "Crear Cuenta Operador MAOA" : "Iniciar Sesión"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isRegisterMode
                ? "Registra tus datos para acceder al panel del Búnker MAOA"
                : "Ingresa tu correo institucional o de operador para entrar a la plataforma"}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nombre Completo del Operador *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="Ej. Arturo Federico"
                    className="w-full bg-[#050811] border border-slate-700 focus:border-cyan-400 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Correo Electrónico *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="usuario@maoa.edu.mx"
                  className="w-full bg-[#050811] border border-slate-700 focus:border-cyan-400 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Contraseña *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#050811] border border-slate-700 focus:border-cyan-400 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              {isRegisterMode ? "Registrar Cuenta y Entrar al Búnker MAOA" : "Entrar al Búnker MAOA"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              {isRegisterMode
                ? "¿Ya tienes cuenta? Inicia sesión"
                : "¿Primera vez aquí? Registra tu cuenta"}
            </button>
            <a
              href={`https://wa.me/52${SUPPORT_PHONE}?text=${encodeURIComponent(
                "Hola, necesito ayuda para iniciar sesión en el Búnker MAOA."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
            >
              <HelpCircle className="w-3.5 h-3.5" /> ¿Problemas para entrar?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
