import dotenv from "dotenv";

dotenv.config();
const DEFAULT_PORT = 3000;
export const PORT = process.env.PORT || DEFAULT_PORT;
