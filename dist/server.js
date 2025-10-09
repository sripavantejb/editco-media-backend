import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import connectRoutes from './routes/connect.route.js';
import adminRoutes from './routes/admin.route.js';
config();
const app = express();
// Configure CORS to allow requests from production frontend and previews
const allowedOrigins = [
    'https://editco-media.studio',
    'https://editco-media-frontend.vercel.app',
    // production (vercel app)
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];
const vercelPreviewRegex = /\.vercel\.app$/; // allow preview deployments
// Allow custom domains (root and www) for the production site
const customDomainRegexes = [
    /^https?:\/\/(www\.)?editcomedia\.studio$/, // without hyphen
    /^https?:\/\/(www\.)?editco-media\.studio$/ // with hyphen (defensive)
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // server-to-server or curl
        const isCustomDomain = customDomainRegexes.some((regex) => regex.test(origin));
        if (allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin) || isCustomDomain) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
// Explicitly enable preflight across all routes
app.options('*', cors(corsOptions));
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