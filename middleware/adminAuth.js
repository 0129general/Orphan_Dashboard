const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  // console.log("middleware:", token, req);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("err;", err);
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Failed to authenticate admin token" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = adminAuthMiddleware;
