import { faker } from "@faker-js/faker";



export function fakeNewUser(){
    return { 
        username:faker.internet.userName(),
        password:faker.internet.password(),
    }
}