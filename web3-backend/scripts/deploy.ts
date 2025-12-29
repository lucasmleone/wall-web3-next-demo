/// <reference path="../hardhat.config.ts" />
import "@nomicfoundation/hardhat-ethers";
import hre from "hardhat";

async function main() {
    console.log("Iniciando despliegue...");

    // 1. Obtenemos el contrato (Hardhat v3: ethers está en network.connection)
    const { ethers } = await hre.network.connect();
    const Muro = await ethers.getContractFactory("Muro");

    // 2. Desplegamos
    const muro = await Muro.deploy();

    // 3. Esperamos a que se confirme
    await muro.waitForDeployment();

    // 4. Mostramos el resultado
    console.log("¡Muro desplegado con éxito!");
    console.log("Dirección del contrato:", await muro.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});