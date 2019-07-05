interface Text<T> {
  (arg:T):T,
}

function test<T extends string[]>(...arr:T):void {

}

test('sad','dsa');
