export class Response {
  public static error = (code: number, message: string) => {
    return {
      statusCode: code,
      body: JSON.stringify({
        error: {
          code: code,
          message: message,
        },
      }),
    };
  };

  public static ok = (data: any) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ data: data }),
    };
  };
}
