function authMiddleware(req, res, next) {
  let session = req.session;
  if (session.user) next();
  else {
    res.status(403).send("Please login");
  }
}
module.exports = { authMiddleware };
