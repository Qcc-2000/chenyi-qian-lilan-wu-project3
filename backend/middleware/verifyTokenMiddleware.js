import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Extract token from cookie

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "HUNTERS_PASSWORD");
    req.user = decoded;
    next();
  } catch (error) {
    // redirect to login page
    res.redirect("/login");
  }
};
export { verifyToken };
