const unauthorized = function(next) {
  const err = new Error(`Forbidden`);
  err.title = "forbidden";
  err.status = 403;
  next(err);
}

const notFound = (reqType, next, title=null, message=null) => {
  const err = new Error(`${reqType} couldn't be found`);
    err.title = title || `${reqType} not found`;
    err.errors = message || {message: `${reqType} couldn't be found`};
    err.status = 404;
    next(err);
}

module.exports = { unauthorized, notFound }
