/**
 * 柯里化实际上就是不断通过创建闭包保存入参
 * 延迟执行函数
 * 
 * 最后一刻,所有的入参都塞入函数中
 */

function add(a,b,c,d){
    return (a+b+c)*d;
}

//用于创建两个入参的延迟执行函数
//add(a,b)->add(a)(b)
const sub_curry = function(fn){
    return (...arg1)=>{
        return (...arg2)=>{
            return fn(...arg1,...arg2);
        }
    }
}

const curry = function(fn,length){
    //该函数作用
    //1. 如果需要延迟执行,就用sub_curry再加一个参数
    //2. 如果函数需要执行了,就直接执行函数
    return (...arg)=>{
        if(arg.length<length){
            return curry(sub_curry(fn)(...arg),length-arg.length)
        }else{
            return fn(...arg);
        }
    }
}

const add2 = curry(add,4);
console.log(add2(3)(2)(3)(2));