const allowedOrigins = (process.env.NODE_ENV === "dev") 
  ? ['*'] // Allow all in development
  : [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2, process.env.CORS_ORIGIN_3]; 

const corsOption = {
    origin: (process.env.NODE_ENV === "dev") 
      ? '*' 
      : (origin, callback) => {
          if (allowedOrigins.includes(origin)) {
            callback(null, true); // Allow request
          } else {
            callback(new Error('Not allowed by CORS')); // Deny request
          }
        },
    credentials: true // Allow credentials like cookies
};

export default corsOption;
