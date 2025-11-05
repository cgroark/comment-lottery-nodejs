import { Router } from "express";
import { dynamoClient } from "../db/dynamoClient";
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";

const entriesRouter = Router();

entriesRouter.get("/", async (_req, res) => {
  try {
    const data = await dynamoClient.send(new ListTablesCommand({}));
    res.json({ tables: data.TableNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to list tables" });
  }
});

export default entriesRouter;
