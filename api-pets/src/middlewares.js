// export const validarCamposPetsMiddlewares = (
//   req,
//   res,
//   next,
// ) => {
//   try {
//     const { nome, raca, idade, nomeTutor } = req.body;

//     if (!nome) {
//       return res.status(400).json({
//         ok: false,
//         mensagem: "O campo 'nome' é obrigatório.",
//       });
//     }
//     if (!raca) {
//       return res.status(400).json({
//         ok: false,
//         mensagem: "O campo 'raca' é obrigatório.",
//       });
//     }
//     if (!idade) {
//       return res.status(400).json({
//         ok: false,
//         mensagem: "O campo 'idade' é obrigatório.",
//       });
//     }
//     if (!nomeTutor) {
//       return res.status(400).json({
//         ok: false,
//         mensagem: "O campo 'nomeTutor' é obrigatório.",
//       });
//     }
//     next();
//   } catch (error) {
//     res.status(400).json({
//       ok: false,
//       mensagem: error.toString(),
//     });
//   }
// };

// Tem uma forma mais performática de validar os campos obrigatórios, evitando múltiplos if's e retornando todos os campos faltantes de uma vez, caso haja mais de um. Isso torna o código mais limpo e eficiente.
import { pets } from "./pets.js";
export const validarCamposPetsMiddlewares = (
  req,
  res,
  next,
) => {
  try {
    const { nome, idade, raca, nomeTutor } = req.body;
    const camposObrigatorios = [
      "nome",
      "idade",
      "raca",
      "nomeTutor",
    ];
    // Filtrar em uma única passada para ganhar performance.
    for (const campo of camposObrigatorios) {
      if (
        req.body[campo] === undefined ||
        req.body[campo] === null ||
        req.body[campo] === ""
      ) {
        return res.status(400).json({
          ok: false,
          mensagem: `O campo '${campo}' é obrigatório.`,
        });
      }
    }
    next();
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensagem: error.toString(),
    });
  }
};

// Verifica se o ID passado na URL existe (usado no GET/:id, PUT, PATCH, DELETE)
export const verificarExistenciaPetMiddleware = (
  req,
  res,
  next,
) => {
  const { id } = req.params;
  const pet = pets.find((pet) => pet.id === id);
  if (!pet) {
    return res.status(404).json({
      ok: false,
      mensagem: "Pet não encontrado!",
    });
  }
  // Armazenar o pet encontrado no objeto de requisição para uso posterior.
  req.petEncontrado = pet;
  next();
};
