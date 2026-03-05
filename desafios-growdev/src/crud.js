/* Descrição da Atividade Nesta atividade, você deverá desenvolver um programa
em JavaScript responsável por realizar um CRUD (Create, Read, Update e Delete)
de veículos.

Todas as interações com o usuário devem ser realizadas exclusivamente através de
prompt, e as informações devem ser exibidas utilizando console.log e/ou alert,
conforme necessário.
 */

/* Requisitos Gerais Cada veículo deve possuir os seguintes dados:

Identificador (ID) Modelo Marca Ano Cor Preço

Os veículos devem ser armazenados em uma lista (array).

Cada veículo deve possuir um identificador único, gerado automaticamente pelo
sistema.

A lista de veículos deve estar ordenada pelo preço.

A funcionalidade de filtro deve ser realizada por marca e apresentar os veículos
ordenados pelo preço.

Apenas os campos cor e preço podem ser atualizados.

O sistema deve sempre retornar ao menu inicial após a execução de uma ação. */

import PromptSync from "prompt-sync";
import fs from "fs"; //Módulo para manipular arquivos
const prompt = PromptSync();
const CAMINHO_ARQUIVO = "./src/veiculos.json";

let listaVeiculos = [];
let proximoId = 1;

// --- Funções Auxiliares ---

// Regra: Sempre manter a lista principal ordenada por preço
const ordenarPorPreco = () => {
  listaVeiculos.sort((a, b) => a.preco - b.preco);
};

// Obriga o usuário a ler antes de prosseguir a fim visualizar as informações no console.
const pausar = () => {
  prompt("\nPressione ENTER para continuar...");
};

// Função seeding - Popula array automaticamente
// const gerarDadosIniciais = () => {
//   const seeds = [
//     {
//       id: proximoId++,
//       modelo: "Civic",
//       marca: "Honda",
//       ano: 2022,
//       cor: "Preto",
//       preco: 12000,
//     },
//     {
//       id: proximoId++,
//       modelo: "Gol",
//       marca: "VW",
//       ano: 2015,
//       cor: "Branco",
//       preco: 35000,
//     },
//     {
//       id: proximoId++,
//       modelo: "Onix",
//       marca: "Chevrolet",
//       ano: 2020,
//       cor: "Prata",
//       preco: 65000,
//     },
//   ];
//   listaVeiculos.push(...seeds);
//   ordenarPorPreco();
// };

// Salva a lista atual no arquivo JSON
const salvarDados = () => {
  try {
    fs.writeFileSync(
      CAMINHO_ARQUIVO,
      JSON.stringify(listaVeiculos, null, 2),
    );
  } catch (error) {
    console.log("\n❌ Erro ao salvar dados", error);
  }
};

// Carrega os dados do arquivo ao iniciar
const carregarDados = () => {
  try {
    if (fs.existsSync(CAMINHO_ARQUIVO)) {
      const conteudo = fs.readFileSync(
        CAMINHO_ARQUIVO,
        "utf-8",
      );
      listaVeiculos = JSON.parse(conteudo);

      // Atualiza o proximoId para não repetir IDs já existentes
      if (listaVeiculos.length > 0) {
        proximoId =
          Math.max(...listaVeiculos.map((v) => v.id)) + 1;
      }
    }
  } catch (error) {
    console.log(
      "⚠️  Arquivo de dados não encontrado. Iniciando lista vazia.",
    );
  }
};

// --- Funcionalidades do CRUD ---

// 1. Criar Veículo
const criarVeiculo = () => {
  let continuar = "s";

  do {
    console.log("\n--- CADASTRO DE NOVO VEÍCULO ---");
    const modelo = prompt("Modelo: ");
    const marca = prompt("Marca: ");
    const ano = parseInt(prompt("Ano: "));
    const cor = prompt("Cor: ");
    const preco = parseFloat(prompt("Preço (ex: 50000): "));

    const anoAtual = new Date().getFullYear();
    const anoString = ano.toString();

    // Validação de segurança:
    // 1. Deve ser um número (isNaN)
    // 2. 1886: Ano da patente do primeiro automóvel moderno (Benz Patent-Motorwagen)
    // 3. anoAtual + 1: Permite modelos de "ano/modelo" lançados antecipadamente
    // 4. length !== 4: Garante que o usuário não digite anos abreviados (ex: 25 em vez de 2025)
    if (
      isNaN(ano) ||
      ano < 1886 ||
      ano > anoAtual + 1 ||
      anoString.length !== 4
    ) {
      console.log(
        `❌ Erro: Digite um ano válido com 4 dígitos (entre 1886 e ${anoAtual + 1}).`,
      );
      return;
    }
    if (isNaN(preco) || preco <= 0) {
      console.log(
        "❌ Erro: O preço deve ser maior que zero.",
      );
      return;
    }

    if (
      !modelo ||
      !marca ||
      isNaN(ano) ||
      !cor ||
      isNaN(preco)
    ) {
      console.log(
        "❌ Erro: Dados inválidos. Operação cancelada para este veículo.",
      );
    } else {
      const veiculo = {
        id: proximoId++,
        modelo,
        marca,
        ano,
        cor,
        preco,
      };

      listaVeiculos.push(veiculo);
      console.log(`✅ ${modelo} adicionado à lista!`);
    }

    continuar = prompt(
      "\nDeseja cadastrar outro veículo? (s/n): ",
    ).toLowerCase();
  } while (continuar === "s");

  // Ordena apenas uma vez ao final de todos os cadastros para ganhar performance
  ordenarPorPreco();
  salvarDados();
  console.log("\n--- CADASTRO FINALIZADO ---");
};

// 2. Listar Veículos
const listarVeiculos = () => {
  if (listaVeiculos.length === 0) {
    console.log("❌ NENHUM VEÍCULO CADASTRADO.");
    return;
  }

  console.log(
    "\n==================================================================================",
  );
  console.log("--- LISTA DE VEÍCULOS (ORDEM DE PREÇO) ---");
  // Lista formatada apenas para exibição técnica
  const tabelaFormatada = listaVeiculos.map(
    ({ id, modelo, marca, ano, cor, preco }) => ({
      ID: id,
      Modelo: modelo.toUpperCase(),
      Marca: marca.toUpperCase(),
      Ano: ano,
      Cor: cor.toUpperCase(),
      Preço: preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    }),
  );

  console.table(tabelaFormatada);
  console.log(
    "==================================================================================\n",
  );
  pausar();
};

// 3. Filtrar por Marca
const filtrarPorMarca = () => {
  if (listaVeiculos.length === 0) {
    console.log("\n❌ LISTA VAZIA.");
    return;
  }

  const busca = prompt(
    "Digite a marca desejada: ",
  ).toLowerCase();

  const filtrados = listaVeiculos.filter(
    ({ marca }) => marca.toLowerCase() === busca,
  );

  if (filtrados.length === 0) {
    console.log(
      `\n❌ Nenhum veículo da marca "${busca}" encontrado.`,
    );
    return;
  }

  console.log(
    `\n--- RESULTADOS PARA: ${busca.toUpperCase()} ---`,
  );
  console.log(
    "\n=========================================================================",
  );
  const tabelaFiltrada = filtrados.map(
    ({ id, modelo, marca, ano, cor, preco }) => ({
      ID: id,
      Modelo: modelo.toUpperCase(),
      Marca: marca.toUpperCase(),
      Ano: ano,
      Cor: cor.toUpperCase(),
      Preço: preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    }),
  );

  console.table(tabelaFiltrada);
  console.log(
    "=========================================================================\n",
  );
  pausar();
};

// 4. Atualizar Veículo
const atualizarVeiculo = () => {
  const idVeiculo = parseInt(
    prompt("Digite o ID do veículo para atualizar: "),
  );
  const veiculo = listaVeiculos.find(
    ({ id }) => id === idVeiculo,
  );

  if (!veiculo) {
    console.log("❌ NENHUM VEÍCULO ENCONTRADO.");
    return;
  }

  // Desestrutura apenas para ler e mostrar ao usuário
  const { modelo, marca, cor, preco } = veiculo;

  console.log(`\nEditando: ${modelo} (${marca})`);

  const novaMarca = prompt(
    `Nova marca (atual: ${marca}) [Vazio p/manter]: `,
  );

  const novaCor = prompt(
    `Nova cor (atual: ${cor}) [Vazio p/ manter]: `,
  );
  const novoPreco = prompt(
    `Novo preço (atual: ${preco}) [Vazio p/ manter]: `,
  );

  if (novaMarca) veiculo.marca = novaMarca; // Altera o objeto real
  if (novaCor) veiculo.cor = novaCor;
  if (novoPreco) veiculo.preco = parseFloat(novoPreco); // Altera o objeto real

  ordenarPorPreco();
  salvarDados();
  console.log("✅ Veículo atualizado!");
  pausar();
};

// 5. Remover Veículo
const removerVeiculo = () => {
  const id = parseInt(prompt("Digite o ID para remover: "));
  const index = listaVeiculos.findIndex((v) => v.id === id);

  if (index === -1) {
    console.log("❌ ID não encontrado.");
    return;
  }

  const confirmacao = prompt(
    `Tem certeza que deseja remover o ${listaVeiculos[index].modelo}? (s/n): `,
  ).toLowerCase();

  if (confirmacao === "s") {
    const removido = listaVeiculos.splice(index, 1);
    console.log(
      `✅ ${removido[0].modelo} removido da frota.`,
    );
  } else {
    console.log("\n ✅ Ação cancelada.");
  }
  salvarDados();
};

// --- Inicialização Automática do exibirMenu ---
(() => {
  // gerarDadosIniciais();
  carregarDados();
  let rodando = true;

  while (rodando) {
    console.log(`
    _________________________________
    |   -=-=- MENU VESTE TECH -=-=- |
    |                               |
    |   1. Cadastrar Veículo        |
    |   2. Listar Veículos          |
    |   3. Filtrar por Marca        |
    |   4. Atualizar (Cor/Preço)    |
    |   5. Remover Veículo          |
    |   6. Sair                     |
    |_______________________________|
    `);

    const opcao = prompt("Escolha uma opção: ").trim();

    switch (opcao) {
      case "1":
        criarVeiculo();
        break;
      case "2":
        listarVeiculos();
        break;
      case "3":
        filtrarPorMarca();
        break;
      case "4":
        atualizarVeiculo();
        break;
      case "5":
        removerVeiculo();
        break;
      case "6":
        console.log("Encerrando sistema...");
        rodando = false;
        break;
      default:
        console.log("❌ OPÇÃO INVÁLIDA.");
    }
  }
})();
