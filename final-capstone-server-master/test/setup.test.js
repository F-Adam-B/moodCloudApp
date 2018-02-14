'use strict';
require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const {DATABASE_URL} = require('../config');
const {dbConnect, dbDisconnect} = require('../db-mongoose');

process.env.NODE_ENV = 'test';
process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

before(function() {
    return dbConnect(DATABASE_URL);
});

after(function() {
    return dbDisconnect();
});

describe('Mocha and Chai', function() {
    it('should be properly setup', function() {
        expect(true).to.be.true;
    });
})