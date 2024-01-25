function uploadTime(time){
    let times = new Date().getHours() - time.getHours()
    if(times < 1){
        return `Uploaded ${new Date().getMinutes() - time.getMinutes()} minutes ago`
    }
    return `Uploaded ${times} hours ago`
}

module.exports = uploadTime;