import { runTask, runTaskWithMicro, TIMER_TAG, arrValidBeforeSort, jMax, jMin as _jMin, jMax as _jMax } from "./sort-utils";

// ==============================冒泡排序

function _bubbleSort__(arr, res = [], knowMax = Infinity)
{
  if (arr.length < 2) return res.concat(arr);

  //{
  let maxIndex = 0;
  let max = arr[maxIndex];
  // let max = -Infinity;
  // let j = 0;
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
  return _bubbleSort_(next, res, knowMax);//NOTE: 在块作用域底部的return...还是尾调用吗？？？
  //}
  // return _bubbleSort_(arr.slice(1), res, knowMax);// 不支持尾调用优化的浏览器可能堆栈溢出
  // arr.splice(0, 1);
  // return _bubbleSort_(arr, res, knowMax);
}

function bubbleSorTC(arr, knowMax = Infinity)
{
  // 整理，优化
  const _bubbleSort_ = (arr) => 
  {
    const res = [];
    const _innerTask = () =>
    {
      if (arr.length < 2) return res.concat(arr);
      let maxIndex = 0;
      let max = arr[maxIndex];

      for (let j = 0; j < arr.length; j++)
      {
        if (max > knowMax) throw new Error('knowMax值小于给定数组的最大值!')
        if (max == knowMax) break;
        if (arr[j] > max)
        {
          max = arr[j];
          maxIndex = j;
        }
      }
      res.push(max);
      arr.splice(maxIndex, 1);
      return _innerTask();
    }
    return _innerTask();
  }

  return arrValidBeforeSort(arr, (arrShadowCopy) => _bubbleSort_(arrShadowCopy));
}

function bubbleSortAsync(arr, knowMax = Infinity)
{

  const _bubbleSortWithoutTC_ = async (arr) =>
  {
    const res = [];
    let resLen = 0;
    let maxIndex = 0;
    const jMax = Math.max(Math.min(arr.length, _jMax), _jMin);//50000;//10000;
    let i = 0, j = 0;
    let max = 0;
    let hasGetMax = false;

    const taskStep = () =>
    {
      if (i === arr.length || hasGetMax)
      {
        // 算法1
        res.push(max);
        arr.splice(maxIndex, 1);
        maxIndex = 0;
        i = 0;
        // max = 0;
        hasGetMax = false;

        // 算法2，更贴近冒泡的说法
        // // resLen++;
        // arr.splice(maxIndex, 1);
        // // arr.unshift(max);
        // arr.splice(resLen, 0, max);
        // resLen++;
        // maxIndex = resLen;
        // i = resLen;
        // // max = 0;
        // hasGetMax = false;
      }
      if (j > jMax / 2)
      // NOTE: 上面写法，避免了如下情形：
      // 例如：j虽然不等于jMax ，但是j等于jMax - 1,那么下一次定时就只能执行一次循环体，效率低下
      // if (j === jMax)
      {
        // NOTE:执行后，下次就要定时了
        j = 0;
        console.error(TIMER_TAG);
      }
    }

    const task = () =>
    {
      // console.timeLog(TIMER_TAG);
      // console.timeStamp
      // console.log("数组长度：", arr.length);
      max = arr[maxIndex];
      for (; i < arr.length && j < jMax; i++, j++)
      // for (let j = 0; i < arr.length && j < 1000; i++, j++)
      {
        if (arr[i] > max)
        {
          max = arr[i];
          maxIndex = i;
        }
        if (max > knowMax) throw new Error('knowMax值小于给定数组的最大值!')
        if (max == knowMax)
        {
          hasGetMax = true;
          break;
        }
      }
      taskStep();
    }

    j = 1;
    do
    {
      await runTaskWithMicro(task, { iSync: j !== 0 });
      // await runTask(task);
    } while (arr.length);
    // 算法2，更贴近冒泡的说法, 与方法1不同，这是在原数组中操作，剩下最后一个就不用了
    // } while (i < arr.length - 1);

    return res;
    // 算法2，更贴近冒泡的说法
    // return arr;
  }

  return arrValidBeforeSort(arr, (arrShadowCopy) => _bubbleSortWithoutTC_(arrShadowCopy));
}


// ==============================快速排序

function _arr2LR_(arr)
{
  if (arr.length < 2) throw new Error('数组长度不能小于2！');
  const center = parseInt(arr.length / 2);
  const centerVal = arr[center];
  const arrL = [], arrR = [];
  arr.forEach(e =>
  {
    if (e > centerVal)
    {
      arrL.push(e)
    }
    else
    {
      arrR.push(e)
    }
  });
  // NOTE: 防止死循环
  if (arrL.length === 0)
  {
    arrL.push(centerVal);
    // NOTE: centerVal在arrR中的索引和在arr中的索引位置一样
    arrR.splice(center, 1);
  }
  return [arrL, arrR];
}

function quicklySort(arr)
{
  arrValidBeforeSort(arr);
  if (arr.length < 2) return [...arr];
  const _quickSort_ = (arr) =>
  {
    if (arr.length < 2) return arr;
    const [arrL, arrR] = _arr2LR_(arr);
    return _quickSort_(arrL).concat(_quickSort_(arrR));
  }
  return _quickSort_([...arr]);
}

function quicklySorTC(arr)
{
  const _quickSorTC_ = (arr) =>
  {
    const res = [];
    let flag = true;
    arr.forEach(t =>
    {
      if (!Array.isArray(t))
      {
        res.push(t);
      }
      else if (t.length === 1)
      {
        res.push(...t);
      }
      else if (t.length > 1)
      {
        flag = false;
        res.push(..._arr2LR_(t));
      }
    })
    return flag ? res : _quickSorTC_(res);
  }
  return arrValidBeforeSort(arr, (arrShadowCopy) => _quickSorTC_([arrShadowCopy]));
}

export { bubbleSorTC, bubbleSortAsync, quicklySort, quicklySorTC }
