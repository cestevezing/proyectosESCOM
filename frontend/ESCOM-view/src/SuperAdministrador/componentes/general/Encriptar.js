export function encriptar(data) {
    var jwt = require('jsonwebtoken');
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (600 * 600),
        data: data
    }, 'C6`v2DjMj^n=>F*GE');
    return token;
}

export function desencriptar(token) {
    var jwt = require('jsonwebtoken');
    var respuesta;
    jwt.verify(token, 'C6`v2DjMj^n=>F*GE', function (err, decoded) {
        respuesta= decoded.data;
    });
    return respuesta;
}