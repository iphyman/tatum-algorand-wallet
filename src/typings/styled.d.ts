import { Colors } from "./colors";

declare module "styled-components/macro" {
  export interface DefaultTheme extends Colors {}
}
