# HR ScienceQuest - Your One-Stop Notes Marketplace  

**HR ScienceQuest** is a web application built with the **MERN stack** (MongoDB, Express, React, Node.js), providing a seamless platform for students and educators to buy and sell academic notes. It ensures secure user authentication with **JWT** and offers hassle-free payment processing via **Razorpay**.  

---

## Features  

- **User Authentication**: Secure login and registration using **JSON Web Tokens (JWT)**.  
- **Sell Your Notes**: Upload and list your notes with detailed descriptions, pricing, and preview options.  
- **Purchase Notes**: Browse and purchase notes with a simple and secure checkout process.  
- **Payment Integration**: Seamless and secure payment handling using **Razorpay**.  
- **User Dashboard**: View your uploaded notes, purchase history, and manage your account.  
- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.  

---

## Tech Stack  

- **Frontend**: React.js with Tailwind CSS for styling  
- **Backend**: Node.js with Express.js for API management  
- **Database**: MongoDB for storing user, product, and transaction data  
- **Authentication**: JWT for secure user login and session management  
- **Payment Gateway**: Razorpay for handling online transactions  
- **Media Storage**: Cloudinary for efficient storage and management of images and other media files  

---

## Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/saquibjawedbit/notes-web.git
   cd hr-sciencequest

2.
  ```bash
   #Server
  cd backend
  npm install
  ```
  ```bash
  # Client
  cd frontend
  npm install
  ```

3.
  ```bash
  # Make a .env file and place it in the backend
  PORT=5000
  MONGO_URI=your-mongo-uri
  NODE_ENV=development
  CORS_ORIGIN_1=http://example1.com
  CORS_ORIGIN_2=https://example2.com
  CORS_ORIGIN_3=http://example3.com
  ACCESS_TOKEN_SECRET=your-access-token-secret
  ACCESS_TOKEN_EXPIRY=7d
  REFRESH_TOKEN_SECRET=your-refresh-token-secret
  REFRESH_TOKEN_EXPIRY=10d
  CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
  CLOUDINARY_API_KEY=your-cloudinary-api-key
  CLOUDINARY_API_SECRET=your-cloudinary-api-secret
  SMTP_EMAIL=your-smtp-email
  SMTP_PASSWORD=your-smtp-password
  RAZORPAY_API_KEY=your-razorpay-api-key
  RAZORPAY_API_SECRET=your-razorpay-api-secret


4. Start the development server:  
   ```bash
   # For the server
   cd server
   npm run dev
   
   # For the client
   cd ../client
   npm run dev

