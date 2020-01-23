const getNewPassword = () => {
    let tempArray = [];
    while (tempArray.length < 9) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        if (tempArray.indexOf(randomNumber) === -1) tempArray.push(randomNumber);
    }
    return tempArray;
};

const reversePassword = (passwordArray) => {
    let tempArray = [].concat(passwordArray).reverse();
    return tempArray;
};

const isPasswordCorrect = (correctPassword, guessedPassword) => {
    return correctPassword === guessedPassword ? true : false;
};


module.exports = {
    getNewPassword,
    reversePassword,
    isPasswordCorrect
}