const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode, gasEstimates } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // console.log('gasEstimates', gasEstimates);
  // Use of of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);

});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // ok method checks truthy or falsy
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();

    assert.equal(message, 'Hi there!');

  });

});



/**
how to use mocha

class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

// initial declaration
let car;

beforeEach(() => {
  car = new Car();
});

describe('Car', () => {

  it('park should return stopped', () => {

    assert.equal(car.park(), 'stopped');
  });

  it('drive should return vroom', () => {

    assert.equal(car.drive(), 'vroom');
  });

});
*/
