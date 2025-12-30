// Configuración
export { POLYGON_AMOY_CONFIG, CONTRACT_ADDRESS } from './config';

// Funciones de red
export { switchToPolygonAmoy, checkNetwork, onNetworkChange } from './network';

// Funciones de wallet
export { requestAccounts, isMetaMaskAvailable } from './wallet';

// Funciones de contrato
export {
    getProvider,
    getSigner,
    getContractReadOnly,
    getContractWithSigner,
    publicarMensaje,
    obtenerMensajes
} from './contract';
