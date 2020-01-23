const getNewPassword = () => {
    let tmpArray = [];
    while (tmpArray.length < 9) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        if (tmpArray.indexOf(randomNumber) === -1) tmpArray.push(randomNumber);
    }
    return tmpArray;
};

module.exports = {
    getNewPassword,
}