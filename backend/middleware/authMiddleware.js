import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization || "";
  const parts = header.split(" ");
  if (parts[0] !== "Bearer" || !parts[1]) {
    return res.status(401).json({ error: "No or bad token" });
  }
  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch {
    res.status(401).json({ error: "Token invalid" });
  }
};