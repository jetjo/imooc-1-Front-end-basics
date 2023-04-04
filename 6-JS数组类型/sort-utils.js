function runTask(task, args = { isLoopTask: true })
{
  if (args.isLoopTask === undefined) args.isLoopTask = true;
  return new Promise((res, rej) =>
  {
    setTimeout(() =>
    {
      res(task(args));
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
}


export { runTask, sorTest, runTaskWithMicro, TIMER_TAG }
