// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Muro {

    struct Mensaje {
        address autor;
        string texto;
        uint256 fecha;
    }

    Mensaje[] public listaDeMensajes;

    function publicarMensaje(string memory _texto) public {
        listaDeMensajes.push(Mensaje(msg.sender, _texto, block.timestamp));
    }

    function obtenerTodos() public view returns (Mensaje[] memory) {
        return listaDeMensajes;
    }
}