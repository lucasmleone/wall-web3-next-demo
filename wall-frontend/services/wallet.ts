declare global {
    interface Window {
        ethereum?: any;
    }
}

// Conectar wallet con MetaMask
export const requestAccounts = async (): Promise<string | null> => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        } catch (err) {
            console.error("Error al conectar:", err);
            return null;
        }
    } else {
        alert("MetaMask no detectado. ¿Estás en el navegador?");
        return null;
    }
};

// Verificar si MetaMask está disponible
export const isMetaMaskAvailable = (): boolean => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};
