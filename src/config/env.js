module.exports = {
    jwtSecret: process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET is missing") })(),
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || (() => { throw new Error("MONGO_URI is required in the env ") })(),
}