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
    this.pet.forEach((pet) => {
      pet.track(name);
    });
  }
}

let me = new People();

let pet1 = new Animal("dog");
let pet2 = new Animal("pig");
me.addPet(pet1, pet2);
me.petTrack("dsa");
