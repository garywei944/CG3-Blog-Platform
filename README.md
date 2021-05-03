# CG3 Blog Platform
UMass Amherst 2021 Spring CS 326 Final Project. Developed with node.js(express) + Bootstrap + jQuery and deployed on heroku(PostgreSQL) and AWS Elastic Beanstalk.

[***Check it on Heroku***](https://stark-tor-10041.herokuapp.com/)

[***Check it on AWS Elastic Beanstalk***](https://cg3.garywei.dev/)


## Back-End API and Routing
### Static and rendered pages
| Path             | Method   | Mark              |
| :-------         | -------- | -------           |
| `/`              | GET      | Home page         |
| `/login`         | GET      | Login page        |
| `/signup`        | GET      | Sign up page      |
| `/post`          | GET      | New post page     |
| `/post/:post_id` | GET      | Blog content page |
| `/:username`     | GET      | User profile page |

### DataBase lookup
| Path               | Method   | Function                           |
| :-------           | -------- | -------                            |
| `/db`              | GET      | Get list of tables in the DataBase |
| `/db/user_account` | GET      | Get the `user_account` table       |
| `/db/post`         | GET      | Get the `post` table               |
| `/db/liked`        | GET      | Get the `liked` table              |
| `/db/follow`       | GET      | Get the `follow` table             |

### API
| Path                            | Method   | Function                                            |
| :-------                        | -------- | -------                                             |
| `/api/homepage`                 | GET      | Get the tiles of all posts                          |
| `/api/login`                    | POST     | Post the username and password                      |
| `/api/register`                 | POST     | Post the username and Password                      |
| `/api/post`                     | POST     | Post the username, tile and content of the new post |
| `/api/blogpage_backened_like`   | POST     | Post new like                                       |
| `/api/blogpage_backened_follow` | POST     | Post new follow                                     |
| `/api/blogpage_poster`          | GET      | Get the author of a post                            |
| `/api/:username/posts`          | GET      | Get all posts of a user                             |
| `/api/:username/follower`       | GET      | Get all followers of a user                         |
| `/api/:username/following`      | GET      | Get all users that are followed by the user         |
| `/api/:username/liked`          | GET      | Get all users that are liked by the user            |
| `/api/:username/edit`           | POST     | Post an edit of the user's username and bio         |
| `/api/:username/follow`         | POST     | Post new follow                                     |
