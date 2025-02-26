const express = require("express");
const {
    identifiedMin,
    identifiedMax,
    identifiedAvg,
    sortArrayToAcs,
    sortArrayToDes,
    listToArrayList,
    countList
} = require("./utill.js")
const app = new express();
const port = 3001;

app.get('/max', (req, res) => {

    const num1 = parseFloat(req.query.num1)
    const num2 = parseFloat(req.query.num2)
    const result = identifiedMax(num1, num2);

    res.status(result.status).json(result.data);
})
app.get('/avg', (req, res) => {

    const numbers = req.query.numbers;

    const array = listToArrayList(numbers);

    const result = identifiedAvg(array, array.length);

    res.status(result.status).json(result.data);


}) // avg?numbers=1,2,4,6,89,6...n
app.get('/sort', (req, res) => {

    const numbers = req.query.numbers;
    const type = req.query.type;
    const array = listToArrayList(numbers);

    if (type === "asc") {
        const result = sortArrayToAcs(array, array.length);
        res.status(result.status).json(result.data);
    } else {
        const result = sortArrayToDes(array, array.length);
        res.status(result.status).json(result.data);

    }

}) // sort?numbers=1,2,4,6,89,6...n&type (asc | dsc)
app.get('/count', (req, res) => {

    const numbers = req.query.numbers;
    const search = req.query.search;

    const array = listToArrayList(numbers);

    const result = countList(array, search);
    res.status(result.status).json(result.data);

})


app.get('/', (req, res) => {

    const num1 = parseFloat(req.query.num1)
    const num2 = parseFloat(req.query.num2)
    const result = identifiedMin(num1, num2);

    res.status(result.status).json(result.data);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});