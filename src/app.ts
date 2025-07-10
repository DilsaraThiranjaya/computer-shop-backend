import express, {Express, Request, Response} from "express";
import productRoutes from "./routes/product.routes";
import cors from "cors";

// 1. Initialize the express app
let app: Express = express();

// 2. Define Middleware
// 2.1 Instruct to parse the request payload data to be converted to JSON format
app.use(express.json());

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?:boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

app.use(cors(corsOptions)); // Enable/Allow CORS here

app.use("/api/products", productRoutes)
app.use("/api/contacts", productRoutes)

// 2.2 Instruct to parse the request payload data to be converted to URL encoded
app.use(express.urlencoded({ extended: true }));

// 3. Define a simple HTTP Get Request
// app.get('/', (req: Request, res: Response) => {
//     console.log(req.body)
//     res.send('Hello World!');
// });

export default app;