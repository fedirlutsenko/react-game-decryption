const getNewPassword = () => {
    let tempArray = [];
    while (tempArray.length <= 7) {
        const randomNumber = Math.floor(Math.random() * 8) + 1;
        if (tempArray.indexOf(randomNumber) === -1) tempArray.push(randomNumber);
    }
    return tempArray;
};

const reversePassword = (passwordArray) => {
    let tempArray = [].concat(passwordArray).reverse();
    return tempArray;
};

const isPasswordCorrect = (correctPassword, guessedPassword) => {
    return JSON.stringify(correctPassword) === JSON.stringify(guessedPassword) ? true : false;
};

const getHighlightedIndexes = (correctPassword, guessedPassword) => {
    let tempArrayOfIndexes = []
    let tempCorrectNumbers = []

    for (i = 0; i <= correctPassword.length; i++) {
        if (correctPassword[i] === guessedPassword[i]) {
                tempArrayOfIndexes.push(correctPassword.indexOf(correctPassword[i]))
        }
    }
    tempArrayOfIndexes.forEach((index) => {
        tempCorrectNumbers.push(guessedPassword[index])
    })
    return tempCorrectNumbers;
}


module.exports = {
    getNewPassword,
    reversePassword,
    isPasswordCorrect,
    getHighlightedIndexes,
}