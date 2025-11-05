import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamoClient = new DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretKey",
  },
});
