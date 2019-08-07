interface IA {
  a: string
}
interface IB {
  b: string
}

type T = IA | IB | (IA & IB)

let arr: T[] = []
 
let aaa=arr.filter<IA|(IA & IB)>((item):item is IA | (IA & IB)=>'a' in item)
arr.map(item => {
  if ('a' in item) {
    return item.a
  } else {
    return null
  }
})

let a2:string[]=[]
for(let i of arr){
  if('a' in i){
    a2.push(i.a)
  }
}