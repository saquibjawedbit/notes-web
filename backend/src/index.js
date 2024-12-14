import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({path: './env'});

connectDB()
.then(()=> {
    const port = process.env.PORT || 8000;
    app.listen(port, () => `Server running on port ${port}`);
})
.catch((err)=> {
    console.log("MongoDb connection failed !! ");
});


