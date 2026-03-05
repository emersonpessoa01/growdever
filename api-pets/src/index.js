import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { pets } from "./pets.js";
import { randomUUID } from "crypto";
import {
  validarCamposPetsMiddlewares,
  verificarExistenciaPetMiddleware,
} from "./middlewares.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send(`
//     <div style="display: flex; flex-direction: column; justify-content: center; height: 100vh;">
//     <h1 style="color: #007BFF;">Falaah! Seja bem-vindo à API de Pets! 🐾</h1>
//     <p>Acesse a página de pets: <a href="https://api-pets-eight.vercel.app/pets">api-pets</a></p></div>
//   `);
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html"),
  );
});

// Listar todos os pets
// GET /pets
app.get("/pets", (req, res) => {
  try {
    res.status(200).json({
      ok: true,
      mensagem: "Pets listados com sucesso!",
      dados: pets,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

/// Criar um novo pet
// POST /pets
app.post(
  "/pets",
  [validarCamposPetsMiddlewares],
  (req, res) => {
    try {
      // Entrada
      const { nome, idade, raca, nomeTutor } = req.body;

      // Processamento
      const novoPet = {
        id: randomUUID(),
        nome,
        idade,
        raca,
        nomeTutor,
      };
      pets.push(novoPet);

      // Saída
      res.status(201).json({
        ok: true,
        mensagem: "Pet criado com sucesso!",
        dados: novoPet,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        mensagem: error.toString(),
      });
    }
  },
);

// Obter um pet por ID
// GET /pets/:id
app.get(
  "/pets/:id",
  [verificarExistenciaPetMiddleware],
  (req, res) => {
    try {
      // Entrada
      const pet = req.petEncontrado;
      // Processamento

      // Saída
      res.status(200).json({
        ok: true,
        mensagem: "Pet encontrado com sucesso!",
        dados: pet,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        mensagem: error.toString(),
      });
    }
  },
);

// Atualizar um pet por ID
// PUT /pets/:id
app.put(
  "/pets/:id",
  [
    validarCamposPetsMiddlewares,
    verificarExistenciaPetMiddleware,
  ],
  (req, res) => {
    try {
      // Entrada
      const pet = req.petEncontrado;
      const { nome, raca, idade, nomeTutor } = req.body;

      // Processamento

      pet.nome = nome;
      pet.idade = idade;
      pet.raca = raca;
      pet.nomeTutor = nomeTutor;

      // Saída
      res.status(200).json({
        ok: true,
        mensagem: "Pet atualizado com sucesso!",
        dados: pet,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        mensagem: error.toString(),
      });
    }
  },
);

// Deletar um pet por ID
// DELETE /pets/:id
app.delete(
  "/pets/:id",
  [verificarExistenciaPetMiddleware],
  (req, res) => {
    try {
      // Entrada
      const pet = req.petEncontrado;
      // Processamento
      // Descobrindo em qual posição esse objeto específico está.
      const petIndex = pets.indexOf(pet);

      pets.splice(petIndex, 1);

      // Saída
      res.status(200).json({
        ok: true,
        mensagem: "Pet deletado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        mensagem: error.toString(),
      });
    }
  },
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}- http://localhost:${PORT}`,
  );
});
