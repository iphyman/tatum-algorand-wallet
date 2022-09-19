import { MONGO_URL } from "../constants";
import { createConnection, Connection } from "mongoose";

let connection: Connection | null = null;

export const getConnection = async (): Promise<Connection> => {
  if (connection === null) {
    connection = createConnection(MONGO_URL, {
      bufferCommands: true,
    });
  }
  return connection;
};
