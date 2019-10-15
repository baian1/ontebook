let a = {
  name: "23"
};

function sayName(this: typeof a) {
  console.log(this.name);
}
