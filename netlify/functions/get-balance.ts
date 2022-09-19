import { Handler } from "@netlify/functions";
import { Response } from "../libs/response";
export const handler: Handler = (event, context) => {
    const payload: {
        
    } = JSON.parse(event.body);

  return Response.ok("hello World");
};
