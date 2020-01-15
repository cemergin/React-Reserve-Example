I was having a lot of issues by deploying it to the `now` hosting service, so I had to deploy it to Heroku, now it's working fine

For anyone having the same issue here is the heroku deployment procedure

This assumes you already have a Heroku account, you have installed the heroku CLI tools and you have a git repository with all of the projects code

Once you have a Next app working locally, you may deploy it for public access.

Revise the npm start script to set the web listener \$PORT:

Merge this entry into package.json:

{
"scripts": {
"dev": "next",
"build": "next build",
"start": "next start -p \$PORT"
}
}
⭐️ In March 2019, Heroku began running npm run build automatically, so the old heroku-postbuild script entry is no longer required.

in your .gitignore file make sure to add the folders `node_modules` and `next` and the files next.config.js and now.json

login to heroku through your web browser then run the commands

heroku login

heroku create
heroku create will create your project with a random name, I will show you how to set it to your preferred name later

git add .
git commit -m 'Next.js app on Heroku'
git push heroku master
set the config variables

heroku config:set NODE_ENV=production
Remember to enclose the mongo srv string within quotes or it wont work

heroku config:set MONGO_SRV='<your-mongo-srv-string>'
heroku config:set JWT_SECRET=<your-jwt-secret>
heroku config:set CLOUDINARY_URL=<your-cloudinary-url>
heroku config:set STRIPE_SECRET_KEY=<your-stripe-secret-key>
to set your desired name for the app

heroku apps:rename <YOUR-DESIRED-NAME>
once you have set the desired name for the app

copy it and paste it in your /utils/baseUrl.js file on your local computer

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://<your-new-app-name>.herokuapp.com' : 'http://localhost:3000';

then once again

git add .
git commit -m 'Made modifications to baseUrl'
git push heroku master
to view your app

heroku open
