# About

A NextJS blog that uses Page Routing (not App Routing).

# How to Start

Clone repo:

```
git clone https://github.com/minijoo/blog-poc.git
cd blog-poc
```

Install package dependencies:

```
npm i # or yarn
```

Run the blog on localhost:

```
npm run dev # or yarn dev
# runs `next` which compiles typescript into .next folder
```

Go to localhost:3000/contact to see if it is working. Home page and posts page will error out if the Node server is not set up concurrently. 

# Set Up Node Server on localhost:3001

See https://github.com/minijoo/jordys-api/blob/main/README.md

# Test Environment Vars

Create .env file with the following 

```
NODE_ENV=development
JORDYS_API_KEY=test_api_key # should match whatever it is on the Node server's .env
PRIVATE_PAGE_KEY=33333 # can be anything
```

# A statically generated blog example using Next.js, Markdown, and TypeScript

This is the existing [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) plus TypeScript.
