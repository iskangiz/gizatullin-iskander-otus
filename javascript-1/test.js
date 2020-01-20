var assert = require('chai').assert;

var fs = require('fs');
var vm = require('vm');
var path = 'script.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

describe("sum", function() {
    it("Если выполнена без аргументов, то возвращает значение суммы всех переданных до этого значений", function() {
        assert.equal(sum(1)(2)(3)(4)(5)(), 1+2+3+4+5);
    });
    it("Если выполнена без аргументов сразу же, возвращает 0", function() {
        assert.equal(sum(), 0);
    });
});