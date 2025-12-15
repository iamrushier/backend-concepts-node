// src/server.ts
import app from "./app.js";
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(` Docs available at http://localhost:${PORT}/docs`);
});
