const usuarioReducer = (state = '', action) => {
    switch (action.type) {
        case 'GETUSUARIO':
            return action.payload;
        case 'SETDEFAULTUSUARIO':
            return 0;
        default:
            return state;
    }
}

export default usuarioReducer