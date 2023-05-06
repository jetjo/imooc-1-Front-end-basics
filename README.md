# imooc-1-Front-end-basics

搜素TODO:，以查看未完成的任务


======================================================以下是临时放在这儿
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>滚动条宽度</title>
        <style>
            #box {
                width: 200px;
                height: 200px;
                padding: 0;
                margin: 0;
                border: none;
                overflow: scroll;
                -ms-overflow-style: scrollbar;
                background-color: #2f90b9;
            }

            #content {
                background-color: #ffc90c;
            }

        </style>
    </head>

    <body>
        <div id="box">
            <div id="content"></div>
        </div>
        <script>
            var box = document.getElementById( 'box' );
            var content = document.getElementById( 'content' );
            var scrollWidth = box.offsetWidth - box.clientWidth;
            content.innerHTML = '滚动条宽度为：' + scrollWidth + 'px';
            console.log(content.offsetWidth);
            console.log(box.clientWidth);
        </script>
    </body>

</html>
