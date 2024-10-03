# NextHire API

NextHire is a job-searching platform API built with Express.js. This API allows users to search for jobs, register and login, and manage their bookmarked jobs. It also includes routes for job searching, user authentication, and bookmark management.

## Features

- Job searching by title, category, location, and job type
- Fetch jobs by category or by job ID
- User registration and login
- Bookmark management (add, fetch, and delete bookmarks)

## Technologies Used

- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Bcrypt**: Encrypt and compare the password
- **JWT**: Genrate secure token for authentication
- **dotenv**: For environment variable management.
- **cookie-parser**: Parse HTTP request cookies.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **Mongoose**: MongoDB object modeling for Node.js.
  
## Getting Started

### Prerequisites

To run this project, you will need the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB (or MongoDB Atlas for cloud-based database)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Yogesh-Ginti/NextHire-Backend.git
    ```

2. Navigate into the project directory:

    ```bash
    cd NextHire-Backend
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    MONGO_URI=<your-mongodb-uri>
    PORT=<your-desired-port>
    SECRET_KEY=<your-secret-key>
    ```

5. Run the server:

    ```bash
    npm start
    ```

   The server will start on the specified port (default: 4000).

## API Endpoints

### Base URL
- **GET `https://next-hire-backend.vercel.app` **

### Routes

#### Search Jobs

- **GET `/search`**: Search jobs using the following query options:
  - `title`: Job title
  - `category`: Job category
  - `location`: Job location
  - `jobType`: Type of job (full-time, part-time, etc.)

#### Job Routes

- **GET `/job/all/:jobCategory`**: Fetch all jobs of a specific category. Available categories:
  - `hr-jobs`
  - `sales-jobs`
  - `it-jobs`
  - `marketing-jobs`
  
- **GET `/job/all/:jobId`**: Fetch a specific job by ID.

#### User Routes

- **POST `/user/register`**: Register a new user.
    - send username, email, password in req body
- **POST `/user/login`**: Login a user.
  - send username, password in req body
#### Bookmark Routes

- **GET `/bookmark`**: Fetch all bookmarks of a user.
- **POST `/bookmark/add`**: Add a new bookmark for a user.
- **DELETE `/bookmark/delete`**: Delete a bookmark for a user.

## Database

The application uses MongoDB for storing job listings, user data, and bookmarks. The connection to the MongoDB database is handled via Mongoose, and the connection string is provided through the `.env` file.

## License

This project is licensed under the MIT License.

