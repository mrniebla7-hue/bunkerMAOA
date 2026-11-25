import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#04070f] text-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h1 className="text-5xl font-black text-rose-400">404</h1>
      <p className="text-slate-300 text-sm">La ruta solicitada no existe.</p>
      <Link to="/" className="text-xs text-cyan-400 hover:underline font-semibold">
        ← Volver al inicio
      </Link>
    </div>
  );
}
