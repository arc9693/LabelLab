# LabelLab
This is a task project.

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
2. In back-end folder of the project,type:
```
mysql -u root -p  LabelLab < LabelLab.sql
```
#### Set up backend
- Open a new terminal and type:
```
cd back-end
```
- Set up enviornment variables
```
export host=<host> port=<port> user=<db_user> password=<password>
```

 - Start the server
 ```
 npm start
 ```
