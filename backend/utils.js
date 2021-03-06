import jwt from "jsonwebtoken";
import config from "./configs/config";

const getToken = (user) => {
  return jwt.sign(user.toJSON(), config.JWT_SECRET, {
    expiresIn: "48h",
  });
};

const isAuth = (req, res, next) => {
  const token = req.header.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).json({ msg: "Invalid Token" });
      }
      req.user = token;
      next();
      return;
    });
  } else {
    return res.status(401).json({ msg: "Token not supplied." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).json({ msg: "Admin token is not valid." });
};

export { getToken, isAdmin, isAuth };
