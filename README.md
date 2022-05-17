# READ ME


_Cloning the repository_

    git clone 'https://github.com/shobitnair/PurchaseForms'

_Installing all modules_

    cd client 
    npm i
    cd ..
    cd server
    npm i

_running client and server_
    
    cd client 
    npm start
    cd ..
    cd server
    node server.js 

_information about ports_
    
    frontend runs in port 3000
    backend runs in port 8000

_setting up database_
    
    create database in postgresql
    There are sql insert scripts for each table in the git repository
    run the sql scripts for each table named with prefix as 'demo_public'
    
    cd server ( in terminal )
    // edit db.js file with your database credentials

### For running both frontend and backend in server

    cd client 
    npm run build
    cd ..
    cd server
    node server.js

    // The frontend runs in the route localhost/site
    // The backend runs in the route localhost/api
    

### Deployment details

    The site is currently deployed in azure via virtual machine.

* The application is deployed using PM2 and Nginx
* Follow this video for reference : https://www.youtube.com/watch?v=NjYsXuSBZ5U
* Follow this article for step-by-step tutorial : https://github.com/Sanjeev-Thiyagarajan/PERN-STACK-DEPLOYMENT
* The above steps are generic for installation in any virtual machine hosting website.