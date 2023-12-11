# URL Shortener

URL Shortener is a web application that allows you to generate short and manageable URLs for your long URLs. The project consists of a client built with React and uses tailwind css for styling and a server-side application built with Node.js. The client provides a user interface for generating and managing short URLs, while the server application handles the URL redirection and storage.

## Deployment

If you don't want to waste time going through installation, I got you covered. Access the demo of this app here: https://fubsy.vercel.app

## Installation

To install and run this project, follow these steps:

### Prerequisites

To run this app, you'll need to ensure you have the following prerequisites installed:

   1. Node.js: Make sure you have Node.js installed on your system. You can download and install the latest version from the official Node.js website: [Node.js](https://nodejs.org)

   2. MongoDB: Install MongoDB on your machine or have access to a MongoDB database. You can download MongoDB Community Edition from the official MongoDB website and follow the installation instructions: [MongoDB](https://www.mongodb.com/try/download/community)

### Server (Node.js)

1. Clone the repository:

```bash
git clone [repository_url]
```

2. Navigate to the server directory:

```bash
cd server
```

3. Install the server dependencies:

```bash
npm install
```

4. Configure Environment Variables for server side

   - Create a `.env` file in the server directory.
   - Set the following variables in the `.env` file:

       ```
       DB_URL=<your_mongodb_uri>
       ACCESS_KEY=<your_jwt_access_secret>
       REFRESH_KEY=<your_jwt_refresh_secret>
       PORT=<port_for_server>
       ```


5. Start the server:

```bash
node index.js
```

The server will start running on the specified `PORT`.

### Client (React - Vite)

1. Navigate to the client directory:

```bash
cd client
```

2. Install the client dependencies:

```bash
npm install
```

3. Configure Environment Variables for Client side:

   - Create a `.env` file in the client directory.
   - Set the following variables in the `.env` file:
            
            
       ```
       VITE_BACKEND_URL=<your_backend_url>
       VITE_FRONTEND_URL=<your_frontend_url>
       ```
   


4. Start the client application:

 ```bash
 npm run dev
```

   The client application will start running on `http://localhost:5173`.

Ensure that both the server and client applications are running simultaneously for the URL shortener app to work correctly.

## Usage

To use the URL Shortener application, follow these steps:

1. Access the application by opening it in your web browser.
2. Sign up or log in to the application using your credentials.
3. On the home page, enter a long URL and a tag in the input fields.
4. Click the "Generate Short URL" button.
5. The shortened URL and corresponding long URL will be displayed.
6. You can click on the "Visit" button to open the shortened URL in a new tab or click "Copy" to copy it to the clipboard.
7. You can access all your URLs under My URLs section in home page.
8. Use the search functionality to filter and find specific URLs based on tags, long URLs, or short URLs.
9. Log out of the application when you're done.

## Technologies Used

- Frontend:
  - React - vite
  - React Router
  - Axios
  - Tailwind CSS

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JSON Web Tokens (JWT)

## Resources and references

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/en/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide for icons](https://lucide.dev)

Made with ❤️ by [Ayush Trivedi](https://github.com/PvNagh)
