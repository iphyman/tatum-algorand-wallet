import { DefaultTheme } from "styled-components/macro";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export default function theme(darkMode: boolean): DefaultTheme {
  return darkMode ? darkTheme : lightTheme;
}
