async function  promiseReduce(asyncFunctions, reduce, initialValue) {
    let currentValue = initialValue;
    for (const asyncFunction of asyncFunctions) {
        await asyncFunction.call().then((funcResult) => {
            currentValue = reduce(currentValue, funcResult);
        });
    }

    return Promise.resolve(currentValue);
}