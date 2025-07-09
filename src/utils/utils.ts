const debounce = (fn: Function, delay: number) => {
  let timerId: number | undefined;
  return () => {
    if(timerId)
      clearTimeout(timerId);
    timerId = setTimeout(fn, delay);
  }
}

export {debounce};
