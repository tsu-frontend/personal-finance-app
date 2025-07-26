// function fn() {
//   console.log(this);
// }

// // fn();

// let ob = {
//   fn() {
//     console.log(this);
//   },
// };

// // ob.fn();

// class Test {
//   constructor() {
//     this.list = [this.fn.bind(this)];

//     this.list[0]();
//   }
//   fn() {
//     console.log("Test is fn", this);
//   }
// }

// // let nTest = new Test();
// // // nTest.fn();

// class test {
//   constructor() {
//     this.bn = this.fn;
//     this.bn()
//     this.list = [this.fn.bind(this, 'name', 'asd')]

//     this.list.forEach(fn => fn(1, 12, 32))
//   }
//   fn = (...ar ) => {
//     console.log(this, ar);
//   }
// }

// let nTest = new test();
// let nTest2 = new test();

// let ar = [1, 2, 3]

// console.log(...ar)
class test {
  constructor() {
    this.list = [this.fn];

    this.list[0]();
  }
  fn() {
    console.log(this);
  }
}

const nts = new test();

// let nTest = new test();
// let nTest2 = new test();

// let ar = [1, 2, 3]

// console.log(...ar)

function cn() {
  let b = 5;
  console.log("first layer");
  return function dn() {
    console.log(b);
  };
}
let retFn = cn();

retFn();
