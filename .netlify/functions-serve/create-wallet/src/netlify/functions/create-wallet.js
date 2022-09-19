var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// netlify/functions/create-wallet.ts
__export(exports, {
  handler: () => handler
});

// netlify/libs/response/index.ts
var Response = class {
};
Response.error = (code, message) => {
  return {
    statusCode: code,
    body: JSON.stringify({
      error: {
        code,
        message
      }
    })
  };
};
Response.ok = (data) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ data })
  };
};

// netlify/functions/create-wallet.ts
var handler = (event, context) => {
  const payload = JSON.parse(event.body);
  return Response.ok(event.body);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=create-wallet.js.map
