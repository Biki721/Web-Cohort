// Description: Implement a proxy that allows negative indexes for an array
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
proxyArr = new Proxy(arr, {
  get(target, prop) {
    prop = Number(prop);
    if (prop < 0) {
      return target[target.length + prop];
    }
    return target[prop];
  },

  set(target, prop, value) {
    prop = Number(prop);
    if (prop < 0) {
      target[target.length + prop] = value;
      return true;
    }
    target[prop] = value;
    return true;
  },
});

// console.log(proxyArr[-1]);
// proxyArr[-1] = 100;
// console.log(proxyArr);
// console.log(arr);

// myId = setTimeout(() => {
//   console.log("Hello");
// }, 1000);
// console.log(myId);

const obj = {
  value: 42,
  regularFunction: function () {
    console.log(this.value); // 'this' refers to 'obj'
  },
  arrowFunction: () => {},
};

obj.regularFunction(); // Output: 42
// obj.arrowFunction(); // Output: undefined (or an error in strict mode)

function b() {
  return this;
}
console.log("------------------------------>", b());
console.log("+++++++++++++++++++++++++++++", this);
