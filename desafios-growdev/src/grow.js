/* Contextualização As Ilhas Growdev formam um reino independente localizado nos
mares do Pacífico. Por ser uma nação recente, sua sociedade é fortemente
influenciada pela tecnologia e pela informática.

A moeda oficial do reino é a GrowCoin (GC$), que possui as seguintes cédulas
disponíveis:

GC$ 50,00 GC$ 10,00 GC$ 5,00 GC$ 1,00

Um grande banco local está implantando caixas eletrônicos automatizados e
contratou você para ajudar no desenvolvimento da lógica responsável pela
distribuição correta das cédulas durante os saques. */

/*  Objetivo do Desafio Desenvolver um algoritmo em JavaScript capaz de:

Receber um valor inteiro de GrowCoins que o cliente deseja sacar; Calcular
quantas cédulas de cada valor devem ser entregues; Garantir que a soma das
cédulas corresponda exatamente ao valor solicitado.
 */

import promptSync from "prompt-sync";
let prompt = promptSync();

/* 1. Receber o valor via prompt e converter para número inteiro */
let valorSaque = parseInt(
  prompt(
    "Digite o valor que deseja sacar (GC$):",
  ),
);

/* Validação extra: verificar se o valor é positivo e válido*/
if (isNaN(valorSaque) || valorSaque <= 0) {
  console.log(
    "Por favor, informe um valor inteiro positivo",
  );
} else {
  console.log(
    `Saque solicitado: GC$ ${valorSaque.toLocaleString(
      "pt-BR",
      {
        minimumFractionDigits: 2,
      },
    )}`,
  );
  console.log("-------------------------");

  /* 2. Definir as cédulas disponíveis (da maior para a menor) */
  const cedulas = [50, 10, 5, 1];

  /* 3. Processar cada cédula */
  for (let nota of cedulas) {
    // Quantas notas dessa cédula cabem no valor atual?(Divisão inteira)
    let quantidadeNotas = Math.floor(
      valorSaque / nota,
    );
    // Ex: Se o valorSaque for 70 e a nota for 50, quantidadeNotas será 1, pois
    // 50 cabe 1 vez em 70.

    // O que sobra após retirar essas notas? (Resto da divisão)
    valorSaque = valorSaque % nota; // Ex: Continuando o exemplo
    // anterior, após retirar 1 nota de 50, sobra 20 (70 % 50 = 20).

    // Agora o valorSaque é atualizado para o que resta, e o loop continua para
    // a próxima cédula. Assim, ele vai calcular quantas notas de 10 cabem em
    // 20, depois quantas de 5 cabem no que sobrou, e assim por diante.

    // Exibir a quantidade de notas, se for maior que zero
    if (quantidadeNotas > 0) {
      console.log(
        `GC$ ${nota.toFixed(2).replace(".", ",")} -> ${quantidadeNotas} ${quantidadeNotas == 1 ? "Nota" : "Notas"}`,
      );
    }
  }
  console.log("-------------------------");
  console.log("Saque realizado com sucesso!");
}
