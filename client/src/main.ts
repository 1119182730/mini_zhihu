import { createApp } from "vue";
import App from "./App";
import "normalize.css";
import router from "./utils/router";
const app = createApp(App);

app.use(router);
app.mount("#app");
