const unauthorized = function(next) {
  const err = new Error(`Forbidden`);
  err.title = "forbidden";
  err.status = 403;
  next(err);
}

module.exports = { unauthorized }
