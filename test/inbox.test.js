const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

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