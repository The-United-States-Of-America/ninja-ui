# [Chat](http://rdel.io/chat)

Sample React chat client :whale:

Built with
- React
- Redux
- Immutable.js
- Semantic UI

There is no backend, this is just a purely front-end project.
Because of that, the following cannot happen:
- You cannot send messages
- You can only log in as User ID's 5 and 6 (any password will work for both)
- An incorrect login is __not__ marked as wrong
- You cannot create new rooms

# Building

```
npm install
gulp
cd target
python -m SimpleHTTPServer 8000
```
