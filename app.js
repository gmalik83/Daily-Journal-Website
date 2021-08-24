const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const homeStartingContent = 'Welcome to My Daily Journal';
const aboutContent =
  "You are here to enquire about me . That's Good . Please proceed to link in Footer";
const contactContent =
  'You can feel Free to Contact me. Thanks for Visiting. Please proceed to link in Footer';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];
app.get('/', function (req, res) {
  res.render('home', {
    homeStartingContent: homeStartingContent,
    posts: posts,
  });
});
app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent });
});
app.get('/about', function (req, res) {
  res.render('about', { aboutContent: aboutContent });
});
app.get('/compose', function (req, res) {
  res.render('compose');
});
app.post('/compose', function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect('/');
});
app.get('/posts/:postName', function (req, res) {
  let requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (requestedTitle == storedTitle) {
      res.render('post', { postTitle: post.title, content: post.content });
    }
  });
});
app.get('/gmalik83', function (req, res) {
  res.redirect('https://www.github.com/gmalik83');
});
app.listen(3000, function () {
  console.log('Server started on port 3000');
});
