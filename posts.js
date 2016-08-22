import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection();
export default Posts;

// here's a collection hook
Posts.before.update((userId, doc, fieldNames, modifier, options) => {
  console.log('success: got to CollectionHooks.Posts.before.update');
  if (!userId) {
    throw new Meteor.Error(401, 'No Meteor User ID, but there should be');
  }
});

// here's a validated method
PostsSetDate = new ValidatedMethod({
  name: 'Posts.methods.SetDate',
  validate({ _id }) {
    if (!_id || !_.isString(_id)) {
      throw new ValidationError([
        { name: 'Invalid _id', type: 'invalid', details: { value: _id } },
      ]);
    }
  },
  // This is the body of the method. Use ES2015 object destructuring to get
  // the keyword arguments
  run({ _id }) {
    // `this` is the same method invocation object you normally get inside
    // Meteor.methods
    if (!this.userId) {
      // Throw errors with a specific error code
      throw new Meteor.Error(
        'Posts.methods.SetDate.noAuth',
        'Must be logged in to set date'
      );
    }
    const doc = Posts.findOne(_id);
    if (!doc) {
      throw new Meteor.Error(
        'Posts.methods.SetDate.noDoc',
        'Invalid ID'
      );
    }
    Posts.update(_id, { $set: { date: new Date(), userId: this.userId } });
  },
});

