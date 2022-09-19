import { UAParser } from "ua-parser-js";

const uaParser = new UAParser(window.navigator.userAgent);
const { type } = uaParser.getDevice();

export const isMobile = type === "mobile" || type === "tablet";
export const userAgent = uaParser.getResult();
