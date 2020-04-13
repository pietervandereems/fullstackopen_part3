const errorHandler = (error, request, response, next) => {
  console.error('errorHandler', error);

  if (error.name === 'CastError' &&
    (error.kind === 'ObjectId' || error.message.substring(0, 16) === 'Cast to ObjectId')) {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = errorHandler;