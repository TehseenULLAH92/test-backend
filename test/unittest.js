var mongoose = require('mongoose');
require('sinon-mongoose');
var sinon = require('sinon');
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;


//Importing our user model for our unit testing.
var User = require('../models/userModel');

describe("Get all Users", function(){
    // Test will pass if we get all users
   it("should return all users", function(done){
        var UserMock = sinon.mock(User);
        var expectedResult = {status: true, user: []};
        UserMock.expects('find').yields(null, expectedResult);
        User.find(function (err, result) {
            UserMock.verify();
            UserMock.restore();
            expect(result.status).to.be.true;
            done();
       });
   });

   // Test will pass if we fail to get a user
   it("should return error", function(done){
       var UserMock = sinon.mock(User);
       var expectedResult = {status: false, error: "Something went wrong"};
       UserMock.expects('find').yields(expectedResult, null);
       User.find(function (err, result) {
        UserMock.verify();
           UserMock.restore();
           expect(err.status).to.not.be.true;
           done();
       });
   });
});


// Add New User 

 // Test will pass if the user is saved
 describe("Post a new user", function(){
    it("should create new user post", function(done){
        var UserMock = sinon.mock(new User({ user: 'Save new user from mock'}));
        var user = UserMock.object;
        var expectedResult = { status: true };
        UserMock.expects('save').yields(null, expectedResult);
        user.save(function (err, result) {
            UserMock.verify();
            UserMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the user is not saved
    it("should return error, if post not saved", function(done){
        var UserMock = sinon.mock(new User({ user: 'Save new user from mock'}));
        var user = UserMock.object;
        var expectedResult = { status: false };
        UserMock.expects('save').yields(expectedResult, null);
        user.save(function (err, result) {
            UserMock.verify();
            UserMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Update a User Based on Its ID
// Test will pass if the user is updated based on an ID
describe("Update a new user by id", function(){
    it("should updated a user by id", function(done){
      var UserMock = sinon.mock(new User());
      var user = UserMock.object;
      var expectedResult = { status: true };
      UserMock.expects('save').withArgs({_id: user._id}).yields(null, expectedResult);
      user.save({_id: user._id}, function (err, result) {
          console.log(result);
          
        UserMock.verify();
        UserMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    // Test will pass if the user is not updated based on an ID
    it("should return error if update action is failed", function(done){
      var UserMock = sinon.mock(new User());
      var user = UserMock.object;
      var expectedResult = { status: false };
      UserMock.expects('save').withArgs({_id: user._id}).yields(expectedResult, null);
      user.save({_id: user._id}, function (err, result) {
          console.log(result);
          
        UserMock.verify();
        UserMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

// Delete a User Based on Its ID
// Test will pass if the user is deleted based on an ID
describe("Delete a user by id", function(){
    it("should delete a user by id", function(done){
        var UserMock = sinon.mock(User);
        var expectedResult = { status: true };
        UserMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
        User.remove({_id: 12345}, function (err, result) {
            UserMock.verify();
            UserMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the user is not deleted based on an ID
    it("should return error if delete action is failed", function(done){
        var UserMock = sinon.mock(User);
        var expectedResult = { status: false };
        UserMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
        User.remove({_id: 12345}, function (err, result) {
            UserMock.verify();
            UserMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});