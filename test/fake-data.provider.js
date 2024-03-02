import { faker } from '@faker-js/faker'

/* ----------------------------------- */
/* it generates fake data  */
/* ----------------------------------- */
export function fakeNewUser () {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
}
