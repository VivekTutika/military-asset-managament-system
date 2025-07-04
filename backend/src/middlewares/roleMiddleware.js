export const requireRole = (...roles) => (req, res, next) => {
  if (
    !req.user ||
    !roles.map(r => r.toLowerCase()).includes(req.user.role.toLowerCase())
  ) {
    return res.status(403).json({ message: 'Forbidden: insufficient role' })
  }
  next()
}
