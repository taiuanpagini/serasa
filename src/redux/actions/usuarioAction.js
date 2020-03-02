function getDadosUsuario(usuario) {
    return {
        type: 'GETUSUARIO',
        payload: usuario,
    };
}

export default getDadosUsuario;

