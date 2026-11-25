import React from "react";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#04070f] text-slate-100 flex flex-col justify-between">
      <header className="border-b border-slate-800 bg-[#070c18] px-6 py-4 flex items-center justify-between">
        <span className="font-mono font-black text-lg text-white">
          BÚNKER <span className="text-cyan-400">MAOA</span>
        </span>
        <nav className="flex items-center gap-6 text-sm font-semibold">
          <Link to="/quienes-somos" className="text-slate-300 hover:text-cyan-400 transition">
            Quiénes Somos
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition"
          >
            Iniciar Sesión
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20 text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Sistema de Gestión <span className="text-cyan-400">BÚNKER MAOA</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base">
          Plataforma de control y seguimiento de reportes, estadísticas y bitácora del proyecto.
        </p>
        <div className="pt-2">
          <Link
            to="/login"
            className="inline-block px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition"
          >
            Ir a Iniciar Sesión
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-[#070c18] px-6 py-5 flex items-center justify-between text-xs text-slate-400">
        <span>BÚNKER MAOA</span>
        <div className="flex items-center gap-6">
          <Link to="/terminos" className="hover:text-cyan-400 transition">
            Términos
          </Link>
          <Link to="/condiciones" className="hover:text-cyan-400 transition">
            Condiciones
          </Link>
        </div>
      </footer>
    </div>
  );
}
