export const adminAuth = (req, res, next) => {
  const email = req.headers['x-admin-email'];
  const password = req.headers['x-admin-password'];

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return next();
  } else {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};