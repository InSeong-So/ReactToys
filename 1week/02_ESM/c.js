import { sayHello } from './b.js';
console.log('module-c');
export const sayHello2 = () => {
    sayHello();
    sayHello();
}