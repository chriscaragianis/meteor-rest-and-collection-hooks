Example REPO for Issue: https://github.com/stubailo/meteor-rest/issues/119

All you have to do is start it up,
it should setup a fake user, post,
and then use HTTP to attempt to:

1. login (works)
2. post to ValidatedMethod
 1. Method Validation (works)
 2. Method run (works)
 3. Collection before update hook (starts, but without the userId)

```
I20160822-18:58:51.176(-4)? create User: myuser/mypass
I20160822-18:58:51.398(-4)? create Post: mydoc
I20160822-18:58:51.398(-4)? --> about to do a REST Login
=> Started your app.

=> App running at: http://localhost:3010/
I20160822-18:58:51.680(-4)? REST Login - got Token: OjTIljRByXJz7OdDXhQdqaAyvx4jnIBXd1Nu96e7vPQ
I20160822-18:58:51.680(-4)? --> about to do a REST Method Call
I20160822-18:58:51.689(-4)? success: got to CollectionHooks.Posts.before.update
W20160822-18:58:52.106(-4)? (STDERR) Error: No Meteor User ID, but there should be [401]
W20160822-18:58:52.106(-4)? (STDERR)     at Object.<anonymous> (posts.js:11:11)
W20160822-18:58:52.106(-4)? (STDERR)     at packages/matb33_collection-hooks/update.js:51:1
W20160822-18:58:52.107(-4)? (STDERR)     at Array.forEach (native)
W20160822-18:58:52.107(-4)? (STDERR)     at Function._.each._.forEach (packages/underscore/underscore.js:105:1)
W20160822-18:58:52.107(-4)? (STDERR)     at packages/matb33_collection-hooks/update.js:50:1
W20160822-18:58:52.107(-4)? (STDERR)     at Array.forEach (native)
W20160822-18:58:52.107(-4)? (STDERR)     at Function._.each._.forEach (packages/underscore/underscore.js:105:1)
W20160822-18:58:52.107(-4)? (STDERR)     at [object Object].<anonymous> (packages/matb33_collection-hooks/update.js:49:1)
W20160822-18:58:52.108(-4)? (STDERR)     at [object Object].collection.(anonymous function) [as update] (packages/matb33_collection-hooks/collection-hooks.js:120:1)
W20160822-18:58:52.108(-4)? (STDERR)     at [object Object].update (packages/mongo/collection.js:589:29)
```
