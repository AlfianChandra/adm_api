import dotenv from "dotenv";
dotenv.config({
  silent: true,
});
import app from "./app.js";
import http from "http";
const appName = process.env.APP_NAME || "Express Appss";
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.clear();
  console.log(`${appName} server running on :${PORT}`);
});
