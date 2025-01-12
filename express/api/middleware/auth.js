// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Mengambil token dari header Authorization
  if (!token) {
    return res.status(403).json({ message: "Token is required!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ code : "TOKEN_EXPIRED", message: "Unauthorized!" });
    }
    req.userId = decoded.userId; // Simpan userId dari token ke dalam request
    next();
  });
};

module.exports = verifyToken;
