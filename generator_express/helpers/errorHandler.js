
/*Custom error handling*/
class ErrorHandler extends Error {
    constructor(statusCode, response) {
      super();
      //
      this.statusCode = statusCode;
      this.response = response;
    }
}

/*Status code handling*/
const handleError = (err, res) => {
    const { statusCode, response } = err;
    res
      .status(statusCode)
      .body.json({
        status: "error",
        statusCode,
        response
      });
};

module.exports = {
  ErrorHandler,
  handleError
}