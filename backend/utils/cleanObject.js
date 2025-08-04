const cleanObject = (obj = {}) => {
    Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (
            val === undefined ||
            val === null ||
            val === "" ||
            (Array.isArray(val) && val.length === 0)
        ) {
            delete obj[key];
        }
    });
    return obj;
}

module.exports = cleanObject;