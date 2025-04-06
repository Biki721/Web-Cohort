import { log } from "console";
import fs from "fs";

// fs.readFile("./file.txt", "utf-8", (err, content) => {
//   if (err) {
//     console.log("Error in file reading", err);
//   } else {
//     console.log("file reading success \n", content);
//     fs.writeFile("./backup.txt", content, (err) => {
//       if (err) {
//         console.log("error in writing file", err);
//       } else {
//         console.log("File write successful");
//         fs.unlink("./file.txt", function (err) {
//           if (err) {
//             console.log("Error in deleting file");
//           } else {
//             console.log("File backup and delete Successful");
//           }
//         });
//       }
//     });
//   }
// });

function readFileWithPromise(filepath, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, encoding, (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}

function writeFileWithPromise(filepath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function unlinkFileWithPromise(filepath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filepath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// readFileWithPromise("./file.txt", "utf-8")
//   .then((content) => {
//     console.log("file read successfully", content);
//     return writeFileWithPromise("./backup.txt", content);
//   })
//   .then(() => unlinkFileWithPromise("./file.txt"))
//   .catch((e) => console.log(e))
//   .finally(() => console.log("file operation successfull"));

async function fileOperation() {
  const content = await readFileWithPromise("./file.txt", "utf-8");
  console.log(content);
  await writeFileWithPromise("./backup.txt", content);
  await unlinkFileWithPromise("./file.txt");
}

// fileOperation().then(() => console.log("FIle operation successful"));
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
    console.log("I am resolved");

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
  const p = new MyPromise((resolve, reject) => {
    reject("hello");
  });
  return p;
}
let p = wait(5);
p.then((e) => console.log(`Promise resolved after 5 sec`, e))
  .catch((err) => console.log(`Rejected after 5 seconds`, err))
  .finally(() => console.log(`Me to har bar chalunga`));
