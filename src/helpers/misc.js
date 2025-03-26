function generateRandomId(len = 4) {
    let out = ""
    while (out.length != len) {
        out = Math.random().toString(36).substring(2, len + 2)
    }

    return out
}