import {
  CreateTableCommand,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "./dynamoClient";

const ENTRIES_TABLE = "Entries";

export const initTables = async () => {
  try {
    await dynamoClient.send(new DescribeTableCommand({ TableName: ENTRIES_TABLE }));
    console.log(`Table "${ENTRIES_TABLE}" already exists`);
  } catch (err: any) {
    if (err.name === "ResourceNotFoundException") {
      console.log(`🛠️ Creating table "${ENTRIES_TABLE}"...`);
      await dynamoClient.send(
        new CreateTableCommand({
          TableName: ENTRIES_TABLE,
          AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
          KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        })
      );
      console.log(`Table "${ENTRIES_TABLE}" created`);
    } else {
      console.error("Error checking/creating table:", err);
    }
  }
};