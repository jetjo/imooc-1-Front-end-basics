import { runTask, runTaskWithMicro, TIMER_TAG } from "./sort-utils";

// 冒泡排序
function _bubbleSort(arr, res = [], knowMax = Infinity)
{
  if (!Array.isArray(arr)) throw new Error('参数必须是数组!')
  if (arr.length < 2) return res.concat([...arr]);

  //{
  let maxIndex = 0;
  let max = arr[maxIndex];
  // let max = -Infinity;
  // NOTE: forEach方法的第一个参数是一个函数，其返回值无意义，返回undefined即可
  // NOTE: forEach方法的遍历范围在第一次循环时确定，在遍历过程中向数组追加的元素不会被访问到
  // NOTE: forEach方法是泛型的，只要对象拥有length和数字名称的成员
  // NOTE: forEach方法无法中途终止
  // NOTE: forEach方法的第一个参数如果返回promise，forEach不会等待promise,只要函数参数中的同步代码完成即进行下一次循环
  // let j = 0;
  // arr.forEach((e, i) =>
  // {
  //   if (e > max)
  //   {
  //     max = e;
  //     j = i;
  //   }
  //   // if (max === knowMax) break;
  // })
  // for (; j < arr.length; j++)
  for (let j = 0; j < arr.length; j++)//这样写，退出循环后就访问不到j了
  {
    if (max > knowMax) throw new Error('knowMax值小于给定数组的最大值!')
    if (max == knowMax) break;
    // 不妥，因为其他关系运算符也没有比较类型
    // if (max === knowMax) break;
    if (arr[j] > max)
    {
      max = arr[j];
      maxIndex = j;
    }
  }
  res.push(max);
  // res.push(Math.max())
  const next = arr; //[...arr];
  // delete next[j];
  next.splice(maxIndex, 1);
  return _bubbleSort(next, res);//NOTE: 在块作用域底部的return...还是尾调用吗？？？
  //}
  // return bubbleSort(arr.slice(1), res);// 不支持尾调用优化的浏览器可能堆栈溢出
  // arr.splice(0, 1);
  // return bubbleSort(arr, res);
}

function bubbleSort(arr, knowMax = Infinity)
{
  return _bubbleSort([...arr], [], knowMax)
}

async function _bubbleSortWithoutTC(arr, knowMax = Infinity)
{
  if (!Array.isArray(arr)) throw new Error('参数必须是数组!')
  if (arr.length < 2) return [...arr];

  const res = [];
  let maxIndex = 0;
  const jMax = 10000;
  let i = 0, j = 0;
  let max = 0;
  let hasGetMax = false;

  const taskStep = () =>
  {
    if (i === arr.length || hasGetMax)
    {
      res.push(max);
      arr.splice(maxIndex, 1);
      maxIndex = 0;
      i = 0;
      max = 0;
      hasGetMax = false;
    }
    if (j > jMax / 2)
    // NOTE: 上面写法，避免了如下情形：
    // 例如：j虽然不等于jMax ，但是j等于jMax - 1,那么下一次定时就只能执行一次循环体，效率低下
    // if (j === jMax)
    {
      j = 0;
    }
  }

  const task = () =>
  {
    console.timeLog(TIMER_TAG);
    // console.timeStamp
    // console.log(arr.length);
    max = arr[maxIndex];
    for (; i < arr.length && j < jMax; i++, j++)
    // for (let j = 0; i < arr.length && j < 1000; i++, j++)
    {
      if (max > knowMax) throw new Error('knowMax值小于给定数组的最大值!')
      if (max == knowMax)
      {
        hasGetMax = true;
        break;
      }
      if (arr[i] > max)
      {
        max = arr[i];
        maxIndex = i;
      }
    }
    taskStep();
  }

  // j = 1;
  do
  {
    await runTaskWithMicro(task, { iSync: j !== 0 });
    // await runTask(task);
  } while (arr.length);

  return res;
}

async function bubbleSortWithoutTcAsync(arr, knowMax = Infinity)
{
  // return new Promise((res, rej) =>
  // {
  //   setTimeout(() =>
  //   {
  //     try
  //     {
  //       res(bubbleSortWithoutTC(arr, knowMax));
  //     } catch (error)
  //     {
  //       rej(error)
  //     }
  //   }, 0);
  // })
  // const res = await _bubbleSortWithoutTC([...arr], knowMax);
  // return res;
  return _bubbleSortWithoutTC([...arr], knowMax);
}

export { bubbleSort, bubbleSortWithoutTcAsync }
