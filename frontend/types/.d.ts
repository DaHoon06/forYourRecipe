import axios from "axios";
import { ins } from "../src/lib/axios";

declare module "vue" {
  interface ComponentCustomProperties {
    axios: typeof ins;
  }
}
