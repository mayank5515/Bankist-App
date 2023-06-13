'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

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
    '2023-06-07T10:51:36.790Z',
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

const account3 = {
  owner: 'Mayank Chaturvedi',
  movements: [1200, 55.23, -306.5, 5000, -642.21, -33.9, 79.97, 1200],
  interestRate: 1.1, // %
  pin: 3333,

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
  currency: 'RUP',
  locale: 'pt-PT', // de-DE
};

const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
// // // // Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const arrowSort = document.querySelector('.arrow');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// /////////////////////////------------------------------APP--------------------------------------------/////////////////////////////////////
let currentAccount, timer; //WILL USE LATER
// //UPDATE UI
const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplaySummary(acc);
  calcDisplayBalance(acc);
};

///////////////////////////
const displayFormattedDates = function (dateInput) {
  //dateInput is an object (date object)
  //NO. OF DAYS PASSED
  const calcDaysPassed = (day1, day2) => {
    return Math.round(Math.abs(day2 - day1) / (24 * 60 * 60 * 1000));
  };
  const daysPassed = calcDaysPassed(new Date(), dateInput);

  if (daysPassed === 0) {
    return 'Today';
  } else if (daysPassed === 1) {
    return 'Yesterday';
  } else if (daysPassed < 7) {
    return `${daysPassed} Days Ago`;
  } else {
    const year = dateInput.getFullYear();
    const month = dateInput.getMonth() + 1;
    const date = dateInput.getDate();
    return `${year}/${month}/${date}`;
  }
};
///////////////////////////
// TO DISPLAY DEPOSITS AND WITHDRAWALS AND HOW MUCH DEPOSITED OR WITHDRAWAL HAS TAKEN PLACE
const displayMovements = function (acc, sort = false) {
  const movs = sort
    ? acc.movements.slice().sort((a, b) => {
        return a - b;
      })
    : acc.movements;

  containerMovements.innerHTML = '';
  movs.forEach(function (mov, i) {
    const tempDate = new Date(acc.movementsDates[i]);
    const displayDate = displayFormattedDates(tempDate);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
     <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov.toFixed(2)} €</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//TO DISPLAY TOTAL BALANCE IN YOUR ACCOUNT AT TOP RIGHT CORNER
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  });
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
};
// TO DISPLAY SUMMARY
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  const outgoing = account.movements
    .filter(mov => mov < 0)
    .map(mov => mov * -1)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  const interests = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((intr, curr, arr) => {
      return intr + curr;
    }, 0);
  labelSumIn.textContent = `${income.toFixed(2)} €`;
  labelSumOut.textContent = `${outgoing.toFixed(2)} €`;
  labelSumInterest.textContent = `${interests.toFixed(2)} €`;
};

//TO COMPUTE USERNAME FROM ACCOUNTS ARRAY
const computeUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(element => element[0])
      .join('');
  });
};
computeUsername(accounts); //accounts naam ka array aaya jiska hr ek element ek object h and fir us hr ek object m owner naam ka property that contains name and we basically computed username for that name

//IMPLEMENTING TIMER FUNCTIONALITY
const displayTimer = function () {
  const tick = () => {
    //IN EACH CALL, PRINT THE REMAINING TIME TO UI
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const secs = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${secs}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
    //DECREASE TIME BY 1 SEC
    time--;
  };
  //SET TIME TO 5 MINS (BUT HERE IT IS REPRESENTED IN SECS)
  let time = 3 * 60;

  //CALL THE TIMER EVERY SECOND
  tick(); //CALLING IT HERE SO IT GETS CALLED IMMEDIATELY FOR THE FIRST TIME AND AFTER THAT IT GETS CALLED EVERY SECOND
  const timerFunc = setInterval(tick, 1000);
  return timerFunc; //RETURNING THE TIMER (SETINTERVAL FUNCTION) MAYBE
};
////IMPLEMENTING LOGIN FUNCTIONALITY
// console.log(timer);
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const inputUsername = inputLoginUsername.value.toLowerCase();
  const inputLgnPin = Number(inputLoginPin.value);
  currentAccount = accounts.find(account => {
    return account.username === inputUsername;
  });

  setInterval(() => {
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = `${nowDate.getMonth() + 1}`; //i dont like to pad it
    const day = `${nowDate.getDate()}`; //i dont wanna pad it
    const hour = nowDate.getHours();
    const min = nowDate.getMinutes();
    const secs = nowDate.getSeconds();
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}:${secs}`;
  }, 1000);

  if (currentAccount?.pin === inputLgnPin) {
    //WHEN ACCOUNT IS CORRECT AND PIN IS CORRECT THEN DO WHAT ?
    //DISPLAY UI AND MESSAGE
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //CLEARING OUT INPUT FIELDS
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
    // displayArrw();
  }
  //CHECKING IF TIMER ALREADY EXISTS OR NOT AND IF IT DOES CLEARING THE TIMER
  if (timer) clearInterval(timer);
  //CALLING THE TIMER
  timer = displayTimer();
});
//IMPLEMENTING TRANSFER FUNCTIONALITY
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiverUsername = inputTransferTo.value.toLowerCase();
  const amountToTransfer = Number(inputTransferAmount.value);
  //get that account which is equal to this username
  const receiverAcc = accounts.find(acc => {
    return receiverUsername === acc.username;
  });

  //CLEARING INPUT FIELDS
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    receiverAcc &&
    amountToTransfer > 0 &&
    currentAccount.balance >= amountToTransfer &&
    receiverAcc?.username !== currentAccount.username
  ) {
    setTimeout(() => {
      //MAKE TRANSFER
      currentAccount.movements.push(-amountToTransfer);
      receiverAcc.movements.push(amountToTransfer);
      // push dates too
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());
      console.log(`Transfered occured!!`);
      //UPDATE UI
      updateUI(currentAccount);
    }, 2000);
  }
  //RESETING THE TIMER
  clearInterval(timer);
  timer = displayTimer();
});
//IMPLIMENTING CLOSE ACCOUNT FEATURE
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value.toLowerCase() === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => {
      return acc.username === currentAccount.username;
    });
    console.log('accounts before :', accounts);
    console.log('Current Account', currentAccount);
    accounts.splice(index, 1);
    console.log('Closed the account');
    //HIDE UI
    containerApp.style.opacity = 0;
    currentAccount = {};
    console.log('accounts after:', accounts);
    console.log('current account now :', currentAccount);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//IMPLEMENTING LOAN ACCOUNT FEATURE
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  /////
  const loanAmnt = Math.floor(inputLoanAmount.value);
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
  if (
    loanAmnt > 0 &&
    currentAccount.movements.some(curr => {
      return curr >= loanAmnt * 0.1;
    })
  ) {
    setTimeout(() => {
      console.log('Loan acquired!');
      currentAccount.movements.push(loanAmnt);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2500);
  }

  //RESETING THE TIMER
  clearInterval(timer);
  timer = displayTimer();
});

let sorted = false; //STATE VARIABLE (WILL TELL US IF SOMETHING IS SORTED OR NOT)
//IMPLEMENTING SORT FEATURE
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(sorted);
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  if (arrowSort.innerHTML === '↓') {
    // console.log("it' a down arrow  so it should be up");
    arrowSort.innerHTML = '↑';
  } else if (arrowSort.innerHTML === '↑') {
    // console.log("It's a up arrow so it should be down");
    arrowSort.innerHTML = '↓';
  }

  //RESETING THE TIMER
  clearInterval(timer);
  timer = displayTimer();
});

//NOTE:
//SHOWING HOW TO TAKE VALUES FROM UI ITSELF
// labelBalance.addEventListener('click', function () {
//   const movUI = Array.from(
//     document.querySelectorAll('.movements__value'), //here class called movements__value is used for taking value from the ui itself
//     el => Number(el.textContent.replace('€', '')) //see
//   );
//   console.log(document.querySelectorAll('.movements__value'));
// const movUI = [...document.querySelectorAll('.movements__value')]; //another way to create an array from NODELIST
//   console.log(movUI);
// });

//HERE WE SELECTED EVERY ODD AND EVEN ROW IN MOVEMENTS ROW
// labelBalance.addEventListener('click', function () {
//   const x = [...document.querySelectorAll('.movements__row')].forEach(
//     (row, i) => {
//       if (i % 2 === 0) row.style.backgroundColor = 'red';
//       else row.style.backgroundColor = 'blue';
//     }
//   );
//   const y = Array.from(x, el => {});
//   // console.log(y);
//   // console.log(x);
// });

// ////////////////////////////------------------APP DONE---------------------------------------------------------------------------------------/////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
