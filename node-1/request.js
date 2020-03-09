async function  Request(requestCount, parallelRequest) {
    console.log(`Start time - ${new Date}`)
    const url = 'http://localhost:3000';

    let promiseArray = [];
    for (let i = 0; i < requestCount; i++) {
        if (parallelRequest) {
            promiseArray[i] = fetch(url).then((request) => {
                console.log(`Request end time - ${new Date}`)
            });
        } else {
            console.log(`Request start time - ${new Date}`)
            await fetch(url).then((request) => {
                console.log(`Request end time - ${new Date}`)
            })
        }
    }

    if (parallelRequest) {
        Promise.all(promiseArray).then(() => {
            console.log(`End time - ${new Date}`)
        })
    } else {
        console.log(`End time - ${new Date}`)
    }
}