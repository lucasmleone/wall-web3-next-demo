'use client'
import { useState, useEffect } from 'react'
import {
  switchToPolygonAmoy,
  checkNetwork,
  onNetworkChange,
  requestAccounts,
  publicarMensaje,
  obtenerMensajes
} from '../services'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [listaMensajes, setListaMensajes] = useState<{ texto: string; autor: string }[]>([])
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

  useEffect(() => {
    if (walletAddress) {
      verificarRed();
      cargarMensajes();
    }

    // Escuchar cambios de red
    onNetworkChange(() => {
      verificarRed();
      window.location.reload();
    });
  }, [walletAddress]);

  const verificarRed = async () => {
    const isCorrect = await checkNetwork();
    setIsCorrectNetwork(isCorrect);
  };

  const connectWallet = async () => {
    const address = await requestAccounts();
    if (address) {
      setWalletAddress(address);
      await switchToPolygonAmoy();
      setIsCorrectNetwork(true);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setListaMensajes([]);
  };

  const enviarMensaje = async () => {
    if (!mensaje) return

    // Asegurarnos de estar en la red correcta antes de enviar
    const networkOk = await switchToPolygonAmoy();
    if (!networkOk) {
      alert("Por favor cambiá a la red Polygon Amoy para continuar.");
      return;
    }

    try {
      await publicarMensaje(mensaje);
      alert("¡Mensaje guardado en la Blockchain!");
      setMensaje("");
      cargarMensajes();
    } catch (err) {
      console.error("Falló el envío:", err);
    }
  };

  const cargarMensajes = async () => {
    try {
      const mensajes = await obtenerMensajes();
      setListaMensajes(mensajes);
    } catch (err) {
      console.error("Error cargando mensajes:", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10 bg-slate-900 text-white gap-8 font-sans">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 mb-2">
          Muro en web3
        </h1>
      </div>

      {!walletAddress ? (
        /* ESTADO: DESCONECTADO */
        <div className="flex flex-col items-center gap-6 mt-20">
          <button
            onClick={connectWallet}
            className="bg-orange-500 hover:bg-orange-600 px-10 py-5 rounded-2xl font-black text-xl shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            CONECTAR METAMASK 🦊
          </button>
        </div>
      ) : (
        /* ESTADO: CONECTADO */
        <div className="w-full max-w-lg flex flex-col gap-8 animate-in fade-in duration-500">

          {/* PANEL DE USUARIO */}
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center shadow-md">
            <div className="flex flex-col">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Wallet</span>
              <span className="text-green-400 font-mono text-sm">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
            </div>
            <button
              onClick={disconnectWallet}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors uppercase font-bold"
            >
              Desconectar
            </button>
          </div>

          {/* INPUT DE MENSAJE */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col gap-4">
            <label className="text-sm font-semibold text-slate-300">Publicar nuevo mensaje</label>
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="p-4 rounded-lg bg-slate-900 border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-white placeholder:text-slate-600"
            />
            <button
              onClick={enviarMensaje}
              className="bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-black uppercase tracking-wider shadow-lg transition-all active:brightness-90"
            >
              Publicar
            </button>
          </div>

          {/* EL MURO (LISTA DE MENSAJES) */}
          <div className="flex flex-col gap-5 mt-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <h2 className="text-xl font-bold text-orange-400 uppercase tracking-tight">El Muro</h2>
              <span className="bg-slate-700 px-2 py-1 rounded text-[10px]">{listaMensajes.length} mensajes</span>
            </div>

            {listaMensajes.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-600 italic">El muro está vacío. Sé el primero en escribir.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {listaMensajes.map((m: any, index: number) => (
                  <div key={index} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-slate-500 transition-all shadow-sm">
                    <p className="text-slate-100 text-lg leading-relaxed">"{m.texto}"</p>
                    <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-500">
                        BY: <span className="text-blue-400">{m.autor.slice(0, 6)}...{m.autor.slice(-4)}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}