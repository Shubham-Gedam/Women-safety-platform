import jwt from "jsonwebtoken";

export function adminAuthMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.userId, role: decoded.role };
    req.token = token;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access, token is invalid" });
  }
}