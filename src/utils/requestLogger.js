const requestLogger = (req, res, next) => {
  console.log('-------------------');
  console.log('** Nueva petición **');
  console.log(`Method: ${req.method}`);
  console.log(`Url: ${req.originalUrl}`);
  console.log(`Path: ${req.path}`);
  Object.keys(req.query).length &&
    console.log(`Query: ${JSON.stringify(req.query)}`);
  Object.keys(req.params).length &&
    console.log(`Params: ${JSON.stringify(req.params)}`);
  Object.keys(req.body).length &&
    console.log(`Body: ${JSON.stringify(req.body)}`);
  console.log(`Hora: ${new Date().toLocaleString()}`);
  console.log('-------------------');
  next();
};

module.exports = requestLogger;
