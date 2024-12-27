const debounce = (func: Function, delay: number) => {
  let timeoutId: number | undefined;
  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeoutId);
    return new Promise<void>((resolve) => {
      timeoutId = setTimeout(() => {
        resolve(func.apply(context, args));
      }, delay);
    });
  };
};

export default debounce