import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 3030;

app.use(express.json());
app.use("/auth", authRoutes);

// Root
app.get("/", (_, res) => {
  res.json({ message: "API Input Validation Demo (Zod + Express)" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
