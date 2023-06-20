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

## Features

The application provides the following features:

1. User Authentication: Secure access to the application using access and refresh tokens. When users sign up or log in, they receive an access token that allows them to make authenticated requests to the server. The access token is also refreshed periodically using a refresh token to maintain user sessions.

2. URL Shortening: Generate short URLs from long URLs provided by the user and add tags to categorize the URLs for better organization. 

3. Display Shortened URLs: View the shortened URLs and their corresponding long URLs on the home page. The list includes tags and the number of clicks each short URL has received. The URLs can be copied and shared publicly.


4. Analytics: Track the number of clicks for each short URL to gain insights into its usage.

5. Search Functionality: Search for specific URLs based on tags, long URLs, or short URLs using the search feature. Enter keywords or parts of the URL to filter and find relevant results.

6. Responsive Design: The application is fully responsive, ensuring a seamless user experience across different devices and screen sizes.

7. Error Handling: Proper error handling is implemented to handle cases such as invalid login and signup attempts, duplicate signups, and invalid URLs. Users are notified of errors and provided with relevant feedback.

8. 404 Error Page: If a user accesses a wrong page or URL within the application, a dedicated 404 error page is displayed, indicating that the requested page was not found.

9. Log Out: Users can log out of the application to ensure the security of their account and data. The access and refresh tokens are invalidated upon logout, preventing unauthorized access to the user's account.

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
