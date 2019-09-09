interface Text<T> {
  (arg: T): T;
}

function test<T extends string[]>(...arr: T): void {}

test("sad", "dsa");

interface ShapeInterface {
  area();
}

abstract class ShapeInterface2 {
  protected abstract area(): void;
}

class AAA extends ShapeInterface2 {
  protected area() {
    return 555;
  }
}
