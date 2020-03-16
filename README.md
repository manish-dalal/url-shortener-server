# url-shortener-server 

## Description

This project was created for an interview as a NodeJS developer, it shows the use of express server and Redis.

## Features
1. Shorten given long URL
2. Redirect to original on accessing short URL
3. Implemented rate limiter so that single user should not be able to hit app more than 100 times per min. 
4. And user can set URL expiry time.
5. URL analytics

### Run Localy

1. Clone the repo `git clone https://github.com/manish-dalal/url-shortener-server.git`
2. Check the redis connection in `config.js` file.
3. `npm install` in command line to install dependencies in `package.json`
4. `npm run dev` server will start in devlopment


## Prerequisites:
Redis must be installed before use. If not installed:
```
brew update
brew install redis
redis-server /usr/local/etc/redis.conf
```
