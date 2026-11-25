import React from "react";
import { Link } from "react-router";

export default function QuienesSomos() {
  return (
    <div className="min-h-screen bg-[#04070f] text-slate-100 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-[#0a101f] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            🛡️ Transparencia y Confianza del Sistema MAOA
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">¿Quiénes Somos?</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Somos la célula de desarrollo y mantenimiento tecnológico del{" "}
            <span className="text-cyan-400 font-bold">Sistema MAOA</span>. Nuestro equipo está
            enfocado en la construcción de soluciones digitales seguras y eficientes para optimizar
            las instalaciones, salvaguardar los recursos y garantizar la conectividad de toda la red.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs">
            <Link to="/dashboard" className="text-cyan-400 hover:underline font-semibold">
              ← Volver al Dashboard
            </Link>
            <Link to="/login" className="text-slate-400 hover:text-white font-semibold">
              Ir a Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
