import { JsonController, Get, Param, Body } from "routing-controllers";

@JsonController()
export class UserControllers {
  @Get("/users")
  getAll() {
    return {
      message: "This is the user",
    };
  }
}
