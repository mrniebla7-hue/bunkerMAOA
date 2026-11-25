import React from "react";
import { Link } from "react-router";

const SUPPORT_PHONE_DISPLAY = "+52 (657) 139-5742";

export default function Condiciones() {
  return (
    <div className="min-h-screen bg-[#04070f] text-slate-100 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-[#0a101f] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Términos, Condiciones y Políticas de Uso
          </h1>
          <p className="text-xs text-slate-400">
            Normativa Oficial del Sistema Búnker MAOA • Proyecto Tofu
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800/80">
            <h2 className="font-bold text-cyan-400 mb-1">1. Propósito del Sistema de Gestión</h2>
            <p>
              La plataforma Búnker MAOA (Proyecto Tofu) está diseñada exclusivamente para reportar,
              dar seguimiento y gestionar reparaciones de equipo de cómputo, instalaciones,
              residuos y mantenimiento general dentro de la red.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800/80">
            <h2 className="font-bold text-cyan-400 mb-1">
              2. Uso Responsable de Reportes y Cuenta
            </h2>
            <p>
              Cada operador que inicia sesión se compromete a registrar información verídica y
              detallada sobre las fallas detectadas, evitando reportes falsos o duplicados en el
              sistema.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800/80">
            <h2 className="font-bold text-cyan-400 mb-1">
              3. Privacidad de Datos y Soporte Directo
            </h2>
            <p>
              Los correos y mensajes enviados a través del apartado de Ayuda y WhatsApp (
              {SUPPORT_PHONE_DISPLAY}) se utilizan únicamente para coordinar la atención técnica
              con los operadores y personal autorizado de MAOA.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-4 text-xs">
          <Link to="/dashboard" className="text-cyan-400 hover:underline font-semibold">
            ← Volver al Dashboard
          </Link>
          <Link to="/terminos" className="text-slate-400 hover:text-white font-semibold">
            Ver Términos
          </Link>
        </div>
      </div>
    </div>
  );
}
 