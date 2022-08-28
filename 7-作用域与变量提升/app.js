

function log()
{
    console.log(a);//undefined
    var a = 1;
    console.log(a);//1
}
log();

function a()
{
    console.log(2);
}
console.log(a);//1?
var a = 3;
console.log(a);//3?
function a()
{
    console.log(4);
}
console.log(a);//3?
a();//Uncaught TypeError: a is not a function?
