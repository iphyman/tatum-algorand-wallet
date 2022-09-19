import { Schema } from "mongoose";
import { getConnection } from "../libs/mongo";

export interface AddressBook {
  userId: string;
  currency: string;
  name: string;
  walletAddress: string;
}

const schema: Schema = new Schema<AddressBook>(
  {
    userId: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    name: { type: String, required: true },
    walletAddress: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const AddressBookModel = async () => {
  const conn = await getConnection();

  return conn.model<AddressBook>("AddressBook", schema);
};
