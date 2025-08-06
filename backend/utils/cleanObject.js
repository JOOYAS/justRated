const cleanObject = (obj = {}) => {
    Object.keys(obj).forEach(key => {
        const val = obj[key];

        if (typeof val === "string") {
            obj[key] = val.trim();
        }

        if (
            val === undefined ||
            val === null ||
            val === "" ||
            (Array.isArray(val) && val.length === 0) ||
            (val && typeof val === "object" && val.constructor === Object && Object.keys(val).length === 0)
        ) {
            delete obj[key];
        }
    });
    return obj;
}

module.exports = cleanObject;