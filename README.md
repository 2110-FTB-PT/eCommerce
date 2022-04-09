# Grace Shopper - eCommerce Application


#### Purpose:

This application is to provide an eCommerce platform (Student Project) 


#### This product provides:

- The front-end interface to allow shoppers/buyers browsing for the products
- The API to interact with the web server and to serve the buyers' requests
- The database to store buyers' accounts, and just the selling products 


#### Basic Environment/Tools:

This is a dynamic server-based application. What you will need is:

1. A domain name, for example, https://www.graceshopper.com
2. A most popular option for this app to run on is to leverage cloud hosting provider free plans, ex: Google Cloud Platform, Microsoft Azure, Amazon Web Services, or very little fee per year for hosting at Netlify. 


#### Quick Start:

- Server side: [p15-graceshopper-server] 
Assume that the readers of this document are Administrators. Git push this folder to a web server that hosts the back-end, ex: Heroku. Then at a local bash terminal, an example with Heroku: 
    $ cd p15-graceshopper-server  //assume it's placed on a system (any) with npm installed
    $ heroku create graceshopper
    $ git remote -v 
      heroku	https://git.heroku.com/graceshopper.git (fetch)
      heroku	https://git.heroku.com/graceshopper.git (push)
    $ git add . 
    $ git commit -m 'initial commit' 
    $ git push heroku main        //'main' or any name already created for the local git
    $ heroku config:set JWT_SECRET='create-any-secret-string-here'  //to add a layer of security
    $ heroku config:set PGSSLMODE=no-verify
    On Heroku web-site > Resources > add Heroku Postgres database management (auto installation)  
    $ heroku run npm run seed     //to initializae and build a database on Heroku web server 
    $ heroku run npm run start    //to start testing the app 
                                  
- Client side: [p15-graceshopper-client]
Deploy the [build] folder onto a domain-name web server that hosts the front-end, ex: deploy this app on Netlify hosting service. Editing the default url to your custom domain name accordingly. An example with Netlify, at local bash terminal: 
    $ cd p15-graceshopper-client  //assume it's placed on a system (any) with npm installed 
    $ npm install                 //install packages specified in package.json
    $ npm run build               //generate a production version of this app
    [build] 
    index.js 
    package.json
    etc. 
    On a browser > Log-in Netlify > look for deploy tab > create new app/site > 
      drag and drop only the [build] folder there 
      > click on the newly created link with a default name, says, https://abc.netlify.com
      > change the name to: https://graceshopper.netlify.com/ 
        or, https://www.graceshopper.com      //if there is a custom domain name 
      > browse to this domain link to test out the app 

- Refer to Grace Shopper manual for further details. 


#### Support:

Application Customer Service: 1-800-ful-stack

