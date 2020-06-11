
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
  console.log("handleError",err)
    const { statusCode, response } = err;
    /* res.status(statusCode)
    res.body.json({
      status: "error",
      statusCode,
      response
    });
   */
    res.status(statusCode)
    res.body = {status: "error", statusCode, response}
    console.log('err',err);
    console.log('res',res.status,res.body);

    return res;

};

module.exports = {
  ErrorHandler,
  handleError
}