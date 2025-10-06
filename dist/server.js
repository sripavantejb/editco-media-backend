import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import connectRoutes from './routes/connect.route.js';
import adminRoutes from './routes/admin.route.js';
config();
const app = express();
// Configure CORS to allow requests from frontend
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());
// Add a simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});
// Register routes
app.use('/api/connect', connectRoutes);
app.use('/api/admin', adminRoutes);
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;
if (!URI) {
    console.error("MONGO_URI is not defined in environment variables");
    process.exit(1);
}
async function main() {
    try {
        await connectDB(URI);
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("Failed to start:", err);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map