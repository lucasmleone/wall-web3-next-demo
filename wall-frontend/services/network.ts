import { POLYGON_AMOY_CONFIG } from './config';

declare global {
    interface Window {
        ethereum?: any;
    }
}

// Función para verificar/cambiar a la red correcta
export const switchToPolygonAmoy = async (): Promise<boolean> => {
    try {
        // Intentar cambiar a Polygon Amoy
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: POLYGON_AMOY_CONFIG.chainId }],
        });
        return true;
    } catch (switchError: any) {
        // Si la red no existe en MetaMask (error 4902), la agregamos
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [POLYGON_AMOY_CONFIG],
                });
                return true;
            } catch (addError) {
                console.error("Error al agregar la red:", addError);
                return false;
            }
        }
        console.error("Error al cambiar de red:", switchError);
        return false;
    }
};

// Verificar si estamos en la red correcta
export const checkNetwork = async (): Promise<boolean> => {
    if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        return chainId === POLYGON_AMOY_CONFIG.chainId;
    }
    return false;
};

// Escuchar cambios de red
export const onNetworkChange = (callback: () => void): void => {
    if (window.ethereum) {
        window.ethereum.on('chainChanged', callback);
    }
};
