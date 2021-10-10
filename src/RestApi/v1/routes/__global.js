function handleToken(bearer) {
    if (bearer == null) {
        throw Error('Invalid Auth.');
    }

    const split = bearer.split(' ');

    if (split.length < 2) {
        throw Error('Invalid Auth.');
    }

    const token = split[1];
    
    if (token == null) {
        throw Error('Invalid Auth.');
    }

    return token;
}

module.exports = {
    handleToken
}