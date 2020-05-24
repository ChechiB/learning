let buildResponse = function (statusCode, msg, data){
    return {
        statusCode: statusCode,
        message: msg,
        data: data
    }

}

module.exports = {
    buildResponse
}