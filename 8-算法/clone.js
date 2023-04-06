function isWrappedType(o)
{
  if (o instanceof Number) return true;
  if (o instanceof Boolean) return true;
}

function wrappedTypeClone(o)
{
  if (o instanceof Number) return Number(o);
  if (o instanceof Boolean) return Boolean(o);
}

function shadowClone(o)
{
  if (!o) return o;
  if (typeof o !== 'object') return o;
  if (isWrappedType(o)) return wrappedTypeClone(o);
  if (Array.isArray(o)) return [...o];
  return { ...o };
}


function deepClone(o)
{
  if (!o) return o;
  if (typeof o !== 'object') return o;
  if (isWrappedType(o)) return wrappedTypeClone(o);
  if (Array.isArray(o))
  {
    return o.map(m => deepClone(m));
  }
  const res = Object.create(null);
  // const res = Object.create(o.__proto__);
  Object.keys(o).map(k =>
  {
    res[k] = deepClone(o[k])
  });
  return res;
}

export { shadowClone, deepClone }
