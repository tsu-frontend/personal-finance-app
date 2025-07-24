function fn() {
  console.log(this);
}

// fn();

let ob = {
  fn() {
    console.log(this);
  },
};

// ob.fn();

// class test {
//   constructor() {
//     this.bn = this.fn;
//     this.bn()
//     this.list = [this.fn.bind(this.ob)]

//     this.list.forEach(fn => fn())
//   }
//   fn() {
//     console.log(this);
//   }
// }

// let nTest = new test();


class test {
  constructor() {
    this.bn = this.fn;
    this.bn()
    this.list = [this.fn.bind(this, 'name', 'asd')]

    this.list.forEach(fn => fn(1))
  }
  fn = (...aas) => {
    console.log(this, aas);
  }
}

let nTest = new test();

let ar = [1, 2, 3]

console.log(...ar)
