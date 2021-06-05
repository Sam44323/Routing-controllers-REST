import {
  JsonController,
  Get,
  Param,
  Body,
  Post,
  Put,
} from "routing-controllers";
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

  @Put("/update-user/:id")
  put(@Body() user: User, @Param("id") id: number) {
    let person = DATA.find((person) => person.id === parseInt(id));
    const index = DATA.findIndex((person) => person.id === parseInt(id));
    const { name, occupation, tagline } = user;
    person = {
      id: person!.id,
      name: name ? name : person!.name,
      occupation: occupation ? occupation : person!.occupation,
      tagline: tagline ? tagline : person!.tagline,
    };
    DATA[index] = person;
    return {
      message: "Updated the person",
      person: DATA[index],
    };
  }
}
