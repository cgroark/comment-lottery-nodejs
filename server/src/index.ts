import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import entriesRouter from "./routes/entries";
import { initTables } from "./db/tables";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/entries", entriesRouter);

app.get("/", (_, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 4000;
initTables().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;
