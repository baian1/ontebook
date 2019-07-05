//thunk的.d.ts文件

//在初始化ThunkDispatch后就可以根据
//通过参数是否可以赋值给Action来判断
//是原来的dispatch函数，参数为一个有type属性的对象
//还是加了一个中间件thunk后的，参数是一个函数(dispatch,getstate,..)=>xx
export interface ThunkDispatch<S, E, A extends Action> {
  <T extends A>(action: T): T;
  <R>(asyncAction: ThunkAction<R, S, E, A>): R;
}

export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R;
