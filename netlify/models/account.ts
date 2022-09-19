import { Schema } from "mongoose";
import { getConnection } from "../libs/mongo";

export interface Account {
  userId: string;
  xpub?: string;
  currency?: string;
  name: string;
  address: string;
  mnemonic: string;
}

const schema: Schema = new Schema<Account>(
  {
    userId: { type: String, required: true },
    xpub: { type: String, required: false },
    currency: { type: String, required: false },
    name: { type: String, required: true },
    address: { type: String, required: true },
    mnemonic: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const AccountModel = async () => {
  const conn = await getConnection();

  return conn.model<Account>("Account", schema);
};
