// src/server.ts
import express from "express";
import emailRoutes from "./routes/emailRoutes.js";
import sendgridRoutes from "./routes/sendgridRoutes.js";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/email", emailRoutes);
app.use("/sendgrid", sendgridRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
