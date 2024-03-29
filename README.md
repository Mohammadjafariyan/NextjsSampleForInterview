Hi , I hope you're all doing well!


I created the following branches using Git Flow:

- `feature/api-implementation`
- `feature/auth-system`

unfortunately git flow deleted branches upon git finish 


## Tech Stack  
**Tools and Frameworks:** Typescript , Prisma, Fastify , AJV ,Swagger , Mocha , supertest

**Docker:** Mysql, Adminer, hydrogen-alpine3.18  


## Features  
- docker debug and production mode  
- integration tests with mocha and supertest 
- mysql adminer in 8080 you can change in docker compose files
- project will run at 3000 but you can change ```.env``` file or dockerfiles
include : ```dockerfile.dev``` , ```dockerfile ```, ```docker-compose.prod.yml ```,
``` docker-compose.dev.yml```
- node:hydrogen-alpine3.18   


# Running with Docker  

there are two docker compose files , one for development and the other for production mode 

I captured a GIF while running with Docker  : 

everything worked fine, all integration tests passed, and finally, I checked the database

![App Screenshot](https://plc-kar.ir/wp-content/uploads/demo.gif)  

[Visit gif demo](https://plc-kar.ir/wp-content/uploads/demo.gif)

[Visit gif demo second link](https://drive.google.com/file/d/1jfDS_DiJn7opbcxfe1DBhxOkwUldSTRm/view?usp=sharing)


##  Running with Docker ( Development Mode )
it will start ```mysql``` , ```adminer``` in 8080 and ```localhost:3000``` then it
 will execute ```integration tests```

you can change in docker compose files and .env in running outside of docker 
docker compose files override .env 

Clone the project  

~~~bash  
  git clone https://github.com/Mohammadjafariyan/NextjsSampleForInterview
~~~

Go to the project directory  

~~~bash  
  cd NextjsSampleForInterview
~~~

Install dependencies  

~~~bash  
docker-compose -f docker-compose.dev.yml up --build
~~~


##  Running with Docker ( Production Mode )
it will start ```mysql``` , ```adminer``` in 8080 and ```localhost:3000``` then it
 will execute ```integration tests```

Clone the project  

~~~bash  
  git clone https://github.com/Mohammadjafariyan/NextjsSampleForInterview
~~~

Go to the project directory  

~~~bash  
  cd NextjsSampleForInterview
~~~

Install dependencies  

~~~bash  
docker-compose -f docker-compose.prod.yml up --build
~~~


# Running without Docker  

## Run Locally ( Development Mode )
Clone the project  

~~~bash  
  git clone https://github.com/Mohammadjafariyan/NextjsSampleForInterview
~~~

Go to the project directory  

~~~bash  
  cd NextjsSampleForInterview
~~~

Install dependencies  

~~~bash  
npm install
~~~

Start the server  

~~~bash  
npm run dev
~~~  
  


## Run Locally ( Production Mode )

Running locally only possible if you already have mysql and change db connection in .env file 

Clone the project  

~~~bash  
  git clone https://github.com/Mohammadjafariyan/NextjsSampleForInterview
~~~

Go to the project directory  

~~~bash  
  cd NextjsSampleForInterview
~~~

Install dependencies  

~~~bash  
npm install
~~~

Build Production   

~~~bash  
npm run build
~~~  

Go to build directory

~~~bash  
cd build
~~~  



Start server

~~~bash  
node server.js
~~~  
