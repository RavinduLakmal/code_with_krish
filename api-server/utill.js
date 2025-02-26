/**
 * *
 * @param num1
 * @param num2
 * @returns {{data: {min: *}, status: number}|{data: {error: string}, status: number}}
 */

export function identifiedMin(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return { status: 400, data: { error: "values have NAN value" } }

    }
    console.log(`compare ${num1} on ${num2}`)

    return {
        status: 200,
        data: { min: num1 > num2 ? num2 : num1 }
    }
}

/**
 * *
 * @param num1
 * @param num2
 * @returns {{data: {max: *}, status: number}|{data: {error: string}, status: number}}
 */
export function identifiedMax(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return { status: 400, data: { error: "values have NAN value" } }

    }
    console.log(`compare ${num1} on ${num2}`)

    return {
        status: 200,
        data: { max: num1 > num2 ? num1 : num2 }
    }
}


/**
 * *
 * @param array
 * @param size
 * @returns {{data: {avg: number, sum: number}, status: number}}
 */

export function identifiedAvg(array,size) {


    let sum = 0;
    let avg = 0;
    for(let a = 0; a<size; a++){
        sum=sum + array[a];
    }

    avg = sum/size;
    return {
        status: 200,
        data: { sum: sum, avg:avg }
    }
}


/**
 * *
 * @param array
 * @param size
 * @returns {{data: {Type: string, value}, status: number}}
 */

export function sortArrayToAcs(array,size) {


    for (let i=1; i<=size; i++){
        for (let j=1; j<=size-i; j++){

          if(array[j]>array[j+1]){

            let temp = array[j];

            array[j] = array[j+1];

            array[j+1] = temp;

        }
    }

}


    return {
        status: 200,
        data: { Type: "Ascending", value:array }
    }
}

/**
 * *
 * @param array
 * @param size
 * @returns {{data: {Type: string, value}, status: number}}
 */
export function sortArrayToDes(array,size) {


    for (let i=0; i<size-1; i++){
        for (let j=0; j< size-i-1; j++){
            console.log(j)
          if(array[j]<array[j+1]){

            let temp = array[j];

            array[j] = array[j+1];

            array[j+1] = temp;
        }
    }

}

 return {
        status: 200,
        data: { Type: "Descending", value:array }
    }
}

/**
 * *
 * @param numbers
 * @returns {*[]}
 */

export function listToArrayList(numbers){
    if (!numbers) {
        res.status(500).json("Numbers is empty");
    }

    const numbersArray = numbers.split(',');
    const array = [];
    numbersArray.forEach(element => {
        array.push(parseFloat(element));
    });
    return array;
}


export function countList(array,search){
    let count = 0;
    array.forEach(ele => {
        if (ele == search) {
            count++;
        }
    })

    return {
        status: 200,
        data:{ count:count,value: search}
    }

}

    // why when values changes return null but its have a NAN 
    // reason is JSON cant identify NaN values
    // then JSON return null 
    // its possible 
