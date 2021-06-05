import { JsonController, Get, Param, Body } from "routing-controllers";
import data from "../utils/data.json";

@JsonController()
export class UserControllers {
  @Get("/users")
  getAll() {
    return {
      message: "All the users",
      persons: data.data,
    };
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    id = parseInt(id);
    // finding a particular person
    const person = data.data.find((person) => person.id === id);
    if (person) {
      return {
        message: "Found",
        person,
      };
    } else {
      return {
        message: "Person not found!",
      };
    }
  }
}
