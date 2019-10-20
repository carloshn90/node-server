# Learning Node with typescript
This project is for learn how to create a node server with typescript and jwt
---
## Requirements
For development, you will only need Node and a node global package, npm, installed in your environement.
### Node
- #### Node installation on Windows
  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).
- #### Node installation on Ubuntu
  You can install nodejs and npm easily with apt install, just run the following commands.
      $ sudo apt install nodejs
      $ sudo apt install npm
- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).
If the installation was successful, you should be able to run the following command.
    $ node --version
    v12.12.0
    $ npm --version
    6.11.3
If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.
    $ npm install npm -g
###
---
## Install
    $ mkdir node-server
    $ cd node-server
    $ git clone https://github.com/carloshn90/node-server.git
    $ npm install
## Configure app
Open `src/config/config.ts` then edit it with your settings. You will need:
- A jwtSecret the actual secret is only for test (unsecurity);
## Running the project
    $ npm run start
## Simple build
    $ npm run build
## Simple testing
    $ npm run test   
## Unit testing
    $ npm run unit-test   
## Integration testing
    $ npm run int-test    
## Project coverage
    $ npm run coverage    
