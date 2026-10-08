# nodejs-05noc


create a series of tasks using Clean Code principles and TDD (Test-Driven Development) to build a Node.js application that manages a simple monitoring system for a server. The application should be able to: notify the user via email when a service is down and log current server metrics to a file.

# dev
1. copy the .env.example file to .env
2. configure the .env file with your email and secret key

```
PORT=3000
MAILER_SERVICE=gmail
MAILER_EMAIL=your-email@example.com
MAILER_SECRET_KEY=your-secret-key
PROD=false
```
3. Execute package install command:
```
npm install
```

4. Execute the dev command:

```
npm run dev
```