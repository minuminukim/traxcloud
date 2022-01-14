# TraxCloud
[TraxCloud](https://traxcloud.herokuapp.com/), is a full-stack clone of the popular music sharing platform SoundCloud, composed in React, a RESTful API built on Node.js and Express, and a PostgreSQL database.

## Live Site
[TraxCloud](https://traxcloud.herokuapp.com/)

## Get Started
**Prerequisites**
- NPM
- A version of Node.js >= 14 on your local machine
- PostgreSQL
- an AWS s3 bucket

**Installation**
- Clone the repo: `git@github.com:minuminukim/traxcloud.git`
- In the `backend` folder run `npm install`
- .. then once again in the `frontend` folder
- Create a Postgres database as well as a user with CREATEDB privileges and a password
- In `backend` create a .env file and declare your environment variables using the .env.example file as a reference
        - To generate a secret, use `openssl` in your shell to generate a random string: `openssl rand -base64 10`
- Initialize your database using sequelize-cli: 
    -  `npx dotenv sequelize db:create`
    -  `npx dotenv sequelize db:migrate`
    -  `npx dotenv sequelize db:seed:all`
- Create your AWS user and bucket:
    - Create a bucket: (https://s3.console.aws.amazon.com/s3/home?region=us-east-1)
    - Navigate to ( https://console.aws.amazon.com/iam/home?#/users) to creae a user with `Programmatic access`.
    - Set up a security policy for your user: 'Attach existing policies directly' => 'Create Policy'
    - Click the `JSON` tab and set a policy:
 ```
 {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1420751757000",
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": "arn:aws:s3:::<NAME OF BUCKET>/*"
    }
  ]
}
```
- Now update your .env with your `Access Key ID`, `Secret Access Key`, and the name of your bucket
- Finally, run `npm start` in `backend` and once again in `frontend`

## Features
- User registration and JWT authentication
- Users are able to upload mp3 files and generate audio players in the browser

## Technologies
- React
- Redux
- Node.js
- Express
- PostgreSQL
- Sequelize
- AWS SDK

     
