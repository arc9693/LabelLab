# LabelLab
[![Build Status](https://api.travis-ci.com/arc9693/LabelLab.svg?token=sHUzNrGtEqnTwmf6ZJih&branch=master)](https://travis-ci.com/arc9693/LabelLab)

### Requires
```
node --version
v11.10.1
```
```
npm --version
6.7.0
or
yarn --version
1.12.3

```

### Build Instructions
#### Cloning the repo
```
git clone "https://github.com/arc9693/LabelLab/"
cd LabelLab

```
#### Set up frontend
```
cd front-end
yarn or npm i
yarn start or npm start

```

#### Database setup
1. In mysql terminal,type:
```
create database LabelLab
```
2. In the command line terminal or bash,type:
```
mysql -u root -p  LabelLab < LabelLab.sql
```
#### Set up backend
- Open a new terminal in the project folder and type:
```
cd back-end
```
- Set up enviornment variables
```
export host=<host> port=<port> user=<db_user> password=<password>
```
- Install the dependencies
```
npm i
```
- Start the server
 ```
 npm start
 ```

### Testing instructions
#### Unit tests
- For front-end
```
cd front-end
npm test
```
- For back-end
```
cd back-end
npm test
```
#### e2e tests`
```
cd front-end
npm run cypress
```

