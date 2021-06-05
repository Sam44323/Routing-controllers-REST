import { JsonController, Get, Param, Body, Post } from "routing-controllers";
import { DATA } from "../utils/data";

interface User {
  name: string;
  occupation: string;
  tagline: string;
}

@JsonController()
export class UserControllers {
  @Get("/users")
  getAll() {
    return {
      message: "All the users",
      persons: DATA,
    };
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    id = parseInt(id);
    // finding a particular person
    const person = DATA.find((person) => person.id === id);
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

  @Post("/add-user")
  post(@Body() user: User) {
    DATA.push({
      ...user,
      id: Math.random(),
    });
    return {
      message: "Added a new user",
      person: user,
    };
  }
}
