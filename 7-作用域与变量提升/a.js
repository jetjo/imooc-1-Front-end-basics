var a = 10;
function fun()
{
    a++;
    console.log(a);
    //提升并且屏蔽了外部变量a
    var a = 5;
    console.log(a);
}

fun();
console.log(a);
