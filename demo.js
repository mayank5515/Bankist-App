const future = new Date(2037, 11, 01, 22, 10, 00); //time is 2037,11(meaning december),01 ,T22,10,00
// const future = new Date(); //2023-06-06T13:32:25.826Z -this is current time which has passed now
// console.log(future); //this is giving me a ISO string i guess but month here is corrected (and not 0 based start)
//GET METHODS
// console.log(future.getFullYear());
// console.log(future.getMonth()); //here it is 0 based month
// console.log(future.getDate()); //1
// console.log(future.getDay()); //2
// console.log(future.toISOString()); //2037-12-01T16:40:00.000Z
// console.log(future.getTime()); //2143298400000 this is timestamp for 'future' date
// console.log(new Date(2143298400000)); //i will time and data or ISO STRING  by providing a timestamp ->>output >>2037-12-01T16:40:00.000Z
// console.log(Date.now()); //currents date timestamp

//SET METHODS
// future.setFullYear(2020);
// console.log(future); //2020-12-01T16:40:00.000Z
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const accounts = [account1, account2];
const currAcc = accounts[0];
const firstStr = currAcc.movementsDates[0];
const secondStr = new Date(currAcc.movementsDates[0]);
// console.log(currAcc.movementsDates[0], typeof currAcc.movementsDates[0]);
// console.log(typeof new Date(1686206333977).toISOString());
// console.log(Date.now())
// console.log(+firstStr);
console.log(+secondStr);