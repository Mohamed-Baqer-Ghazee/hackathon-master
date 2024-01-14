// corsMiddleware.js

import cors from "cors"

export const corsConfig = cors({
    origin: '*' // or use '*' for allowing all origins
});

export default corsConfig;