
export default function sendResponse(res,status,err,data,msg) {
res.status(status).json({
err,
message : msg,
data,

})

}

