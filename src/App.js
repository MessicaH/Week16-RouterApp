// Import React-Bootstrap Icons and CSS files
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
/*
import * as {Component} from "../node_modules/react-bootstrap";   /// like with Icons for React-Bootstrap?////
*/
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import './App.css';
import * as Icon from 'react-bootstrap-icons';

export default function App() {
  const posts = [
    {
      id: 1,
      title: 'My First Post',
      date: '06-25-2023',
      content: 'This is my first post ever'
    },
    {
      id: 2,
      title: 'My Second Post',
      date: '07-26-2023',
      content: 'This is my second post ever'
    },
    {
      id: 3,
      title: 'My Third Post',
      date: '08-27-2023',
      content: 'This is my third post ever'
    }
  ];

  return (
    <Router>
      <div className='container-fluid my-router-app'>
        <div className='my-app-header'>
          <h1>My Router App</h1>
        </div>
        <Switch>
          <Route path="/posts">
            <Posts posts={posts}/>
          </Route>
          <Route path="/friends">
            <Friends names={['Tom','Jax','Stassi']}/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
        <ButtonGroup className='navbar myNavbar'>
          <Button variant='outline-secondary'>
            <Link to="/" alt="Home"><span className='navbarIcon'><Icon.HouseDoorFill/></span></Link>
          </Button>
          <Button variant='outline-secondary'>
            <Link to="/friends" alt="Friends"><span className='navbarIcon'><Icon.PersonHeart/></span></Link>
          </Button>
          <Button variant='outline-secondary'>
            <Link to="/posts" alt="Posts"><span className='navbarIcon'><Icon.JournalText/></span></Link>
          </Button>
        </ButtonGroup>
      </div>
    </Router>
  );
}


function Home() {
  return <h2>Home <Icon.HouseDoorFill/></h2>
}

function Friends(props) {
  const {names} = props;
  return (
  <div className='container-fluid'>
      <h2>Friends <Icon.PersonHeart/></h2>
      <ul>
        {names.map((friend,index) =>
          <li className='friendList' key={index}>{friend}</li>
        )}
      </ul>
  </div>
  );
}

function Posts({posts}) {
  const match = useRouteMatch();
  const findPostById = (id) => 
    posts.filter((post) => post.id == id)[0];
  return (
    <div className='container-fluid'>
    <h2>Posts <Icon.JournalText/></h2>
      {posts.map((post,index) => {
        return (
          <Button className='postsList' key={index} variant=''>
            <Link to={`${match.url}/${post.id}`}>
              {post.title}
            </Link>
          </Button>
        );
      })}
    <Switch>
      <Route 
        path={`${match.path}/:postId`}
        render={(props) => (
          <Post
            {...props}
            data={findPostById(props.match.params.postId)}
            />
        )}
      />
      <Route path={match.path}>
        <p>Select a post to read and reminisce</p>
      </Route>
    </Switch>
    </div>
  )
}

function Post(props) {
  const {data} = props;
  return data == undefined ? 
    <div className='container card errorMessage'>
      <h3>404 - Not Found <Icon.SearchHeart/></h3>
      <p>We couldn't find that information for you because it either:</p>
        <ul>
          <li>Does not exist </li>
          <li>Has moved and its URL address changed, or</li>
          <li><span className='liarError'>Someone lied to you</span></li>
        </ul>
      <p>Seek vengeance and/or check the URL again to find your information.</p>
    </div>
    : (
    <Card className='container postCard'>
      <Card.Header className='postTitle'>{data.title}</Card.Header>
      <Card.Body>
        <Card.Subtitle className='postDate'>Posted on {data.date}</Card.Subtitle>
        <Card.Text className='postContent'>{data.content}</Card.Text>
      </Card.Body>
    </Card>
  )
}

// If we are on [this] Route, what do we want to render? (path="")
// How to force re-render when switching between components in Switch mode?
