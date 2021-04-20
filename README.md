# CG3 Blog Platform
UMass Amherst 2021 Spring CS 326 Final Project. Developed with node.js(express) + Bootstrap + jQuery and deployed on heroku(PostgreSQL).

[***Check it on heroku***](https://stark-tor-10041.herokuapp.com/)


## Back-End API and Routing
### Static and rendered pages
| Path      | Method   | Redirected Path   |
| :-------  | -------- | -------           |
| `/`       | GET      | `/index.html`     |
| `/login`  | GET      | `/loginpage.html` |
| `/signup` | GET      | `/signup.html`    |

### DataBase lookup
| Path                | Method   | Function                           |
| :-------            | -------- | -------                            |
| `/db`               | GET      | Get list of tables in the DataBase |
| `/db/user_account`  | GET      | Get the `user_account` table       |
| `/db/post`          | GET      | Get the `post` table               |
| `/db/post/:post_id` | GET      | Get the post data with `post_id`   |
| `/db/liked`         | GET      | Get the `liked` table              |
| `/db/follow`        | GET      | Get the `follow` table             |

### API
| Path            | Method   | Function                                            |
| :-------        | -------- | -------                                             |
| `/api/homepage` | GET      | Get the tiles of all posts                          |
| `/api/login`    | POST     | Post the username and password                      |
| `/api/register` | POST     | Post the username and Password                      |
| `/api/post`     | POST     | Post the username, tile and content of the new post |


## Directory structure
```
.
├── Procfile
├── README.md
├── db
│   └── index.js
├── index.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   ├── bootstrap.min.css
│   │   ├── bootstrap.min.css.map
│   │   └── xxx.css
│   ├── images
│   │   └── akari.jpg
│   ├── js
│   │   ├── bootstrap.min.js
│   │   ├── bootstrap.min.js.map
│   │   ├── jquery-3.6.0.min.js
│   │   └── xxx.js
│   ├── index.html
│   └── xxx.html
├── routes
│   ├── api
│   │   ├── index.js
│   │   └── xxx.js
│   ├── db
│   │   ├── index.js
│   │   └── xxx.js
│   └── index.js
├── schema_design.sql
├── test.js
├── tree.txt
└── views/pages
    └── xxx.ejs
```


## Steps for turning this repo into a Heroku-Hosted Website

1. Log in to the github.com using your account information
2. Open https://github.com/ftPeter/web-programming-final-project-base in a web browser
3. Click the *fork* button and create a fork local to your own account
4. git clone your new fork of the project and cd into that directory
5. heroku create
6. git push heroku master
7. heroku open /
