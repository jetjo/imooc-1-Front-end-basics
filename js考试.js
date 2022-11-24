
//#region 考点1: 函数和变量声明的提升
var getNum0 = function () { console.log(0); }
function fn1()
{
    function Foo()
    {
        getNum0 = function () { console.log(1); }
        getNum = function () { console.log(1); }
        this.getNum = function () { console.log(2); }
    }

    Foo.prototype.getNum = function () { console.log(3); }

    var getNum = function () { console.log(4); }

    function getNum() { console.log(5); }

    getNum();

    const foo = new Foo();

    getNum();

    foo.getNum();
}

getNum0();
fn1();
getNum0();

//#endregion

//#region 考点2: 类型转换
const str = 'false'//false//'12345a'
console.log(isNaN(str));
console.log(Number(str));
console.log(parseInt(str));
//#endregion
