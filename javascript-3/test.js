var assert = require('chai').assert;
const jsdom = require("jsdom");
// Create a fake DOM for testing with $.ajax
global.window = new jsdom.JSDOM().window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
const { JSDOM } = jsdom;
var fs = require('fs');
var vm = require('vm');
var path = 'script.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

describe("getPath", function() {
    it("Находит вложенный элемент без идентфикатора", function() {
        const dom = new JSDOM(`<!DOCTYPE html>
        <body>
            <div>
                <div>
                    <div></div>
                    <div></div>
                    <div class="elementToFind"></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div></div>
            </div>            
        </body>`);
        let element = dom.window.document.getElementsByClassName("elementToFind")[0];

        let elementPath = getPath(element);

        assert.equal(dom.window.document.querySelector(elementPath), element);
        assert.equal(dom.window.document.querySelectorAll(elementPath).length, 1);
    });
    it("Если подать не HtmlElement, возвращается null", function() {
        let result = getPath(5);

        assert.isNull(result);
    });
});