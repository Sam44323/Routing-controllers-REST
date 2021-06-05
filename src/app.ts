import { createExpressServer } from "routing-controllers";
import { UserControllers } from "./controllers/UserControllers";
import { config } from "dotenv";
import { join } from "path";

config({
  path: join(__dirname, "..", ".env"),
});

console.log(process.env.PORT);

const app = createExpressServer({
  controllers: [UserControllers],
});
app.listen(process.env.PORT || 8000, () => {
  console.log("The server is running on PORT " + process.env.PORT);
});
