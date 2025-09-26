import dotenv from "dotenv";
dotenv.config({
  silent: true,
});
import app from "./app.js";
import http from "http";
const appName = process.env.APP_NAME || "Express App";
const PORT = process.env.SERVER_PORT || 6625;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.clear();
  console.log(`${appName} server running on :${PORT}`);
});
