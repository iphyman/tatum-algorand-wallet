import {
  DecryptCommand,
  DecryptCommandInput,
  DecryptCommandOutput,
  EncryptCommand,
  EncryptCommandInput,
  EncryptCommandOutput,
  KMSClient,
} from "@aws-sdk/client-kms";
import { AWS_KMS_KEY_ID, AWS_REGION } from "../constants";

export class KMS {
  private client: KMSClient;

  constructor() {
    this.client = new KMSClient({ region: AWS_REGION });
  }

  public encrypt = async (
    mnemonic: string
  ): Promise<EncryptCommandOutput | null> => {
    let response: EncryptCommandOutput | null = null;

    const params: EncryptCommandInput = {
      KeyId: AWS_KMS_KEY_ID,
      Plaintext: Buffer.from(mnemonic),
    };

    const command = new EncryptCommand(params);

    try {
      response = await this.client.send(command);
      return response;
    } catch (error) {
      return response;
    }
  };

  public decrypt = async (
    encrypted: string
  ): Promise<DecryptCommandOutput | null> => {
    let response: DecryptCommandOutput | null = null;

    const params: DecryptCommandInput = {
      KeyId: AWS_KMS_KEY_ID,
      CiphertextBlob: Buffer.from(encrypted),
    };

    const command = new DecryptCommand(params);

    try {
      response = await this.client.send(command);
      return response;
    } catch (error) {
      return response;
    }
  };
}
