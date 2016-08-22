import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { HTTP } from 'meteor/http';
import { JsonRoutes } from 'meteor/simple:json-routes';
import { Posts } from '../posts';


Meteor.startup(() => {
  //
  // Enable cross origin requests for all endpoints
  JsonRoutes.setResponseHeaders({
    'Cache-Control': 'no-store',
    Pragma: 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  });
  //
  // code to run on server at startup
  if (Meteor.users.find().count() === 0) {
    console.log('create User: myuser/mypass');
    Accounts.createUser({
      username: 'myuser',
      password: 'mypass',
    });
  }
  if (Posts.find().count() === 0) {
    console.log('create Post: mydoc');
    Posts.insert({ _id: 'mydoc', name: 'my doc' });
  }
  // FAKE REST API - Login
  console.log('--> about to do a REST Login');
  HTTP.call(
    'POST',
    Meteor.absoluteUrl('users/login'),
    { params: { username: 'myuser', password: 'mypass' } },
    (err, res) => {
      const token = (res && res.data && res.data.token) || null;
      if (!token) throw new Meteor.Error(500, 'REST login failed, no token');
      console.log('REST Login - got Token:', token);
      // FAKE REST API - ValidatedMethod
      console.log('--> about to do a REST Method Call');
      HTTP.call(
        'POST',
        Meteor.absoluteUrl('methods/Posts.methods.SetDate'),
        {
          // if this header isn't there, you can't execute the ValidatedMethod
          headers: { Authorization: `Bearer ${token}` },
          // if this payload isn't there, you can't execute the ValidatedMethod
          params: { _id: 'mydoc' },
        },
        (err2, res2) => {
          if (err2) throw err2;
          console.log('REST method response', res2);
        }
      );
    }
  );
});

