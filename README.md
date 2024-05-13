### EventuraApi

![Eventura Logo](https://github.com/IsuriDisanayaka/eventuraClient/blob/main/client/src/assets/img/logo.png)

#### Overview
EventuraApi is the backend service for Eventura, an event-tracking application. It handles the server-side logic, database interactions, and API endpoints required for managing events.

#### Features
- RESTful API endpoints
- CRUD operations for events
- User authentication
- Email notifications for event reminders
  
#### Tech Stack
- **Node.js**: Server-side runtime environment.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing event data.
- **Mongoose**: MongoDB data modeling.
- **Nodemailer**: Automated email notifications.
- **Joi**: Data validation library.
- **Nodemailer**: For sending email notifications.
- **Node-cron**: Scheduler for periodic tasks.

#### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/IsuriDisanayaka/eventuraApi.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd eventuraApi/Api/functions
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   Create a .env file in the root directory and add your MongoDB URI, email credentials, and other necessary environment variables:
      ```bash
   DB_URL=your_mongodb_uri
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
     ```

5. **Start the development server**:
   ```bash
   npm install -g nodemon
   nodemon server.js
     ```
   Access the API locally at `http://localhost:5000`.

 #### Deployment
   The backend is deployed on Firebase Functions, ensuring scalability and ease of deployment. The live API can be accessed [here](https://us-central1-eventura-effbc.cloudfunctions.net/api).

 #### Contributing
   1. Fork the repository.
   2. Create a new branch (`git checkout -b feature-branch`).
   3. Commit your changes (`git commit -m 'Add some feature'`).
   4. Push to the branch (`git push origin feature-branch`).
   5. Open a pull request.

 #### License

   This project is licensed under the MIT License.
