// interface AnimalConstruct<T> {

//   new(...age:any[]): T
// }
//等价
type AnimalConstruct<T> = new (...arg: any[]) => T;

interface Animal1 {
  name: string;
  track: (name: string) => boolean;
}

class Animal implements Animal1 {
  constructor(public name: string) {}
  track(name: string) {
    return false;
  }
}

interface People1 {
  name: string;
  age: number;
  pet: Animal[];
}

class People implements People1 {
  name = "das";
  age = 5;
  pet: Animal[] = [];
  addPet(...Pets: Animal[]) {
    this.pet.push(...Pets);
  }
  petTrack(name: string) {
    this.pet.forEach(pet => {
      pet.track(name);
    });
  }
}

let me = new People();

let pet1 = new Animal("dog");
let pet2 = new Animal("pig");
me.addPet(pet1, pet2);
me.petTrack("dsa");

fetch(
  "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923&client=tim&ADUIN=320493059&ADSESSION=1562546978&ADTAG=CLIENT.QQ.5603_.0&ADPUBNO=26882",
  {
    method: "GET",
    mode: "no-cors"
  }
)
  .then(res => res.json())
  .then(res => {
    console.log(res);
  })
  .catch(e => console.log(e));
