

function log()
{
    console.log(a, '--------------------');//undefined
    var a = 1;//变量声明提升后 覆盖了全局的a
    console.log(a, '--------------------');//1
}
log();

function a()
{
    console.log(2);
}
console.log(a, '--------------------');//ƒ a() { console.log(46); }
var a = 3;
console.log(a, '--------------------');//3?
function a()
{
    console.log(46);
}
console.log(a, '--------------------');//3?
a();//Uncaught TypeError: a is not a function?
