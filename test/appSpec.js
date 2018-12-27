const App = require("../index");
const assert = require('assert');

let expected, current;
before(function(){
    expected = ["s","sh","sha","shaj","shaja","shajal"]
})
describe("App",()=>{
    describe("extractPrefixes", () => {
        current = App.extractPrefixes("shajal");
        it("length of expected and current is equal",()=>{
            assert.equal(expected.length ,current.length);
        })
        it("returns an array of prefixes for a word", ()=>{
            for(let i=0; i<current.length;i++){
                assert.equal(expected[i],current[i]);
            }
        });
    });
});