import { Handler } from "@netlify/functions";
import { Currency, Fiat, generateAccount } from "@tatumio/tatum";
import { Response } from "../libs/response";
import { AccountModel } from "../models/account";
export const handler: Handler = async event => {
  const payload: {
    name: string;
    userId: string;
  } = JSON.parse(event.body);

  try {
    const accountModel = await AccountModel();

    const account = await generateAccount(
      {
        accountingCurrency: Fiat.USD,
        currency: Currency.ALGO,
        customer: {
          accountingCurrency: Fiat.USD,
          externalId: payload.userId,
        },
      },
      true,
      true
    );

    const res = await new accountModel({
      userId: payload.userId,
      currency: account.account.currency,
      xpub: account.account.xpub,
      name: payload.name,
      address: account.address,
      mnemonic: account.wallet,
    }).save();

    return Response.ok({
      name: res.name,
      currency: res.currency,
      address: res.address,
    });
  } catch (error) {
    console.info(error);

    return Response.error(400, "An uknown error has occured");
  }
};
