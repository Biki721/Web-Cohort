class MyPromise {
  constructor(executorFn) {
    this._state = "pending";
    this._successCallbacks = [];
    this._errorCallbacks = [];
    this._finallyCallbacks = [];
    this.value = undefined;
    this.error = undefined;
    executorFn(
      this.resolverFunction.bind(this),
      this.rejectorFunction.bind(this)
    );
  }

  resolverFunction(value) {
    this._state = "fulfilled";
    this.value = value;
    this._successCallbacks.forEach((cb) => cb(value));
    this._finallyCallbacks.forEach((cb) => cb());
  }

  rejectorFunction(err) {
    this._state = "rejected";
    this.error = err;
    this._errorCallbacks.forEach((cb) => cb(err));
    this._finallyCallbacks.forEach((cb) => cb());
  }

  then(cb) {
    if (this._state === "fulfilled") {
      cb(this.value);
      return this;
    }
    this._successCallbacks.push(cb);
    return this;
  }

  catch(cb) {
    if (this._state === "rejected") {
      cb(this.error);
      return this;
    }
    this._errorCallbacks.push(cb);
    return this;
  }

  finally(cb) {
    if (this._state !== "pending") {
      cb();
      return this;
    }
    this._finallyCallbacks.push(cb);
    return this;
  }
}

function wait(seconds) {
  return new MyPromise((resolve, reject) => {
    reject("hi");
  });
}

wait(5)
  .then((e) => console.log(`Promise resolved after 5 sec`, e))
  .catch((err) => console.log(`Rejected after 5 seconds`, err))
  .finally(() => console.log(`Me to har bar chalunga`));

function hello(x, y, z) {
  console.log(...arguments);
}
hello(20, 30, 40);

function debounce(fn, delay) {
  let myId;
  return function (...args) {
    clearTimeout(myId);
    myId = setTimeout(() => {
      fn.apply(this, args);
    }, delay * 1000);
  };
}

function greet(input) {
  console.log(`Hello!, ${input}`);
}

const callMe = debounce(() => greet("Biki"), 3);
// callMe();
// callMe();
// callMe();
// callMe();
// callMe();
// callMe();
// callMe();
// callMe();

function throttling(fn, delay) {
  let myId = null;
  return (...args) => {
    if (myId == null) {
      fn(...args);
      myId = setTimeout(() => {
        myId = null;
      }, delay * 1000);
    }
  };
}

const callIt = throttling(() => greet("Biki"), 10);
callIt();
callIt();
callIt();
callIt();
