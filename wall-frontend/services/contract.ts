import { ethers } from 'ethers';
import MuroABI from '../constants/Muro.json';
import { CONTRACT_ADDRESS } from './config';

declare global {
    interface Window {
        ethereum?: any;
    }
}

// Obtener provider (conexión a la red)
export const getProvider = () => {
    return new ethers.BrowserProvider(window.ethereum);
};

// Obtener signer (para firmar transacciones)
export const getSigner = async () => {
    const provider = getProvider();
    return await provider.getSigner();
};

// Obtener instancia del contrato (solo lectura)
export const getContractReadOnly = () => {
    const provider = getProvider();
    return new ethers.Contract(CONTRACT_ADDRESS, MuroABI.abi, provider);
};

// Obtener instancia del contrato (lectura y escritura)
export const getContractWithSigner = async () => {
    const signer = await getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, MuroABI.abi, signer);
};

// Publicar un mensaje en el muro
export const publicarMensaje = async (mensaje: string): Promise<string> => {
    const contract = await getContractWithSigner();
    const tx = await contract.publicarMensaje(mensaje);
    console.log("Transacción enviada:", tx.hash);
    await tx.wait(); // Esperamos a que la red confirme
    return tx.hash;
};

// Obtener todos los mensajes del muro
export const obtenerMensajes = async (): Promise<any[]> => {
    const contract = getContractReadOnly();
    const mensajes = await contract.obtenerTodos();
    return mensajes;
};
