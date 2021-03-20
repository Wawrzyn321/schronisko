import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();

const port = process.env.SERVER_PORT;

// define a route handler for the default home page
app.get( "/", ( _req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );