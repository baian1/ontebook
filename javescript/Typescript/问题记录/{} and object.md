# {} and object

- Object  
  Contains stuff that is present in all JavaScript objects. Any value (primitive, non-primitive, null and etc) can be assigned to Object type.

- {}  
  {} is an empty object. It is the same as Object.

- object  
  object was introduced in TypeScript 2.2. It is any non-primitive type. You can't assign to it any primitive type like bool, number, string, symbol, null and undefined, .

```Typescript
var strictTypeHeaders: { [key: string]: string } = {}; // non-primitive type
var header: object = {};
header = strictTypeHeaders; // its OK
strictTypeHeaders = header; // causes error "Type 'object' is not assignable to type '{ [key: string]: string }`"
```
