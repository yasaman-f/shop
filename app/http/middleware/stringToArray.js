function stringToArray (field) {
        if (typeof field == "string") {
            if (field.indexOf(",") >= 0) {
                field = ((field).split(",")).map(item => item.trim())
                return field
            } else {
                field = [field]
                return field
            }
        } else if (Array.isArray(field)){
            field = field.map(item => item.trim())
            field = [... new Set(field)]
        }
}

module.exports = {
    stringToArray
}   