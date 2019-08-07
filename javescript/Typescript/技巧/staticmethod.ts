interface MyType {
  instanceMethod();
}

interface MyTypeStatic {
  new():MyType;
  staticMethod();
}

/* class decorator */
function staticImplements<T>() {
  return <U extends T>(constructor: U) => {constructor};
}

@staticImplements<MyTypeStatic>()   /* this statement implements both normal interface & static interface */
class MyTypeClass { /* implements MyType { */ /* so this become optional not required */
  public static staticMethod() {}
  instanceMethod() {}
}