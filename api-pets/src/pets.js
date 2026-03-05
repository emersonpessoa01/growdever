import { randomUUID } from "crypto";
export const pets = [
  {
    id: randomUUID(),
    nome: "Daphne",
    raca: "Vira-lata",
    idade: 4,
    nomeTutor: "Maria",
  },
  {
    id: randomUUID(),
    nome: "Scooby",
    raca: "Golden Retriever",
    idade: 7,
    nomeTutor: "Fred",
  },
];
