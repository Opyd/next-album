# Application for music playlists

CRUD application for managing lists of music albums to check, save, etc.


## Tech Stack

**Client:** Vue 3, Nuxt

**Server:** Node, Nest.JS, MongoDB

## Screenshots

![Imgur](https://imgur.com/lp0zoMx.png)
![List](https://i.imgur.com/LJIELMd.png)

## Run Locally

You need a local MongoDB database to run this project.

Clone the project

```bash
  git clone https://github.com/Opyd/next-album
```

Go to the project directory

```bash
  cd next-album
```
### Backend


```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start development server

```bash
  npm run start:prod
```

### Frontend

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Visit website in the browser


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`

`MONGODB_URI`
