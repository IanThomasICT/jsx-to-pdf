import express from "express";
import cors from "cors";
import * as path from "path";
import apiRoutes from "./server/routes";

const app = express();

app.use(cors());

/** Frontend */
const staticPath = path.join(process.cwd(), "client");
app.use("/", express.static(staticPath));

/** Client / API routes */
app.use("/api", apiRoutes);

app.listen(3000, () => console.log("🚀 Server ready at: http://localhost:3000"));
