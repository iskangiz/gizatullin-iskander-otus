var assert = require('chai').assert;

var fs = require('fs');
var vm = require('vm');
var path = 'script.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

describe("promiseReduce", function() {
    this.timeout(15000);
    it("Первая функция возвращает 1, вторая 2, результат promiseReduce - 2", async function () {

        let fn1 = () => {
            console.log('fn1');
            return Promise.resolve(1)
        };
        let fn2 = () => new Promise(resolve => {
            console.log('fn2')
            setTimeout(() => resolve(2), 1000)
        });
        let result = await promiseReduce(
            [fn1, fn2],
            function (memo, value) {
                console.log('reduce');
                return memo * value
            },
            1
        );

        assert.equal(result, 2);
    });
});