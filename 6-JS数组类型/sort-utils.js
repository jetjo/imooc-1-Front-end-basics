function runTask(task, args = { isLoopTask: true })
{
  if (args.isLoopTask === undefined) args.isLoopTask = true;
  return new Promise((res, rej) =>
  {
    setTimeout(() =>
    {
      const data = task(args);
      res(data);
    }, 0);
    if (args.isLoopTask)
    {
      task(args)
    }
  });
}

function runTaskWithMicro(task, args = {})
{
  if (args.iSync)
  {
    return task(args);
  }
  else if (args.isMicro)
  {
    return new Promise((res, rej) =>
    {
      res(task(args));
    });
  }
  else
  {
    return runTask(task, args)
  }
}


function learnForeach()
{
  const ratings = [5, 4, 5];
  let sum = 0;

  const sumFunction = async (a, b) => a + b;

  ratings.forEach(async (rating) =>
  {
    sum = await sumFunction(sum, rating);
  });

  console.log("sum = ", sum);
  // Naively expected output: 14
  // Actual output: 0
}
learnForeach();

const TIMER_TAG = 'sort...';

function sorTest(arr = [])
{
  if (!Array.isArray(arr)) throw new Error('参数必须是数组！');
  arr.reduce((pre, curItem) =>
  {
    if (pre < curItem) throw new Error('排序失败！');
    return curItem;
  })
  console.log('排序正确！');
  console.timeEnd(TIMER_TAG)
  return true;
}

function arrValidBeforeSort(arr, cb)
{
  if (!Array.isArray(arr)) throw new Error('参数必须是数组!')
  if (cb)
  {
    if (arr.length < 2) return [...arr];
    // NOTE: 尽量保持纯度，不是什么单一职责的问题，而是每一个函数尽量做的
    return cb([...arr]);
  }
}

const jMax = 1e13;
// Mac顶配，此值开始卡顿
// const jMin = 1e9;
// Mac顶配，恰好
// const jMin = 1e8;
const jMin = 5e7;

export { runTask, sorTest, runTaskWithMicro, TIMER_TAG, arrValidBeforeSort, jMax, jMin }
