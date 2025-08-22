function basicAuth(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        res.setHeader("WWW-Authenticate", "Basic realm=\"Access to API\"");
        return res.status(401).json({ error: "No autorizado" });
    }

    // Decodificar base64 usuario:password
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    // Aquí puedes validar contra una BD de usuarios,
    // por simplicidad lo dejamos hardcodeado:
    if (username === "admin" && password === "1234") {
        return next(); // OK
    }

    return res.status(403).json({ error: "Credenciales inválidas" });
}

module.exports = basicAuth;
