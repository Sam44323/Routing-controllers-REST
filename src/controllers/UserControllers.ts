import {
  JsonController,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from "routing-controllers";

let DATA = [
  {
    id: 1,
    name: "Takashi Nakamoto",
    occupation: "Ninja",
    tagline: "あなたは私のレベルじゃない(You ain't my level)",
  },
  {
    id: 2,
    name: "Lućien Siebor",
    occupation: "Karate",
    tagline: "Mieux vaut faire attention(Better watch out)",
  },
  {
    id: 3,
    name: "Maxi Beckerù",
    occupation: "MMA",
    tagline:
      "Auch wenn es sich wiederholt, werde ich nicht besiegt(Even it it's repeated, I won't be defeated)",
  },
];

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

  @Delete("/remove")
  delete(@Param("id") id: number) {
    DATA = DATA.filter((person) => person.id !== parseInt(id));
    console.log(DATA);
    return;
  }
}
