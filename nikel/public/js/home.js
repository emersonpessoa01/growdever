// Cadastrar usuário
const myModal = new bootstrap.Modal(document.getElementById("transaction-modal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
  transactions: [],
};

const logout = document.getElementById("button-logout");
document.getElementById("transactions-button").addEventListener("click", function () {
  window.location.href = "transactions.html";
});

// Funçao Adicionar lançamento
document.getElementById("transaction-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  //  adicionar lançamento
  data.transactions.unshift({
    value: value,
    type: type,
    description: description,
    date: date,
  });

  saveData(data);
  event.target.reset();
  myModal.hide();

  alert("Lançamento adicionado com sucesso!");
  getCashIn();
  getCashOut();
  getTotal();
});

checkLogged();

// Verificar se está logado, caso não esteja, redirecionar para index.html
function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }
  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  //Capturar dados do usuário
  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }
  //   console.log(data);
  getCashIn();
  getCashOut();
  getTotal();
}

//Logout do usuário
logout.addEventListener("click", function () {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
});

// Função salvar dados no localStorage
function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
//Função para trazer as entradas do tipo 1
function getCashIn() {
  const transactions = data.transactions;
  const cashIn = transactions.filter((item) => item.type === "1");
  //   console.log(cashIn);

  // Mostrar na tela
  if (cashIn.length) {
    let cashInHtml = ``;
    let limit = 0;

    if (cashIn.length > 5) {
      limit = 5;
    } else {
      limit = cashIn.length;
    }

    for (let i = 0; i < limit; i++) {
      //   console.log(i);
      //   console.log(cashIn[i]);

      const date = new Date(cashIn[i].date);
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const formattedValue = Number(cashIn[i].value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      cashInHtml += `
            <div class="row mb-4 p-3 rounded shadow-sm bg-white p-card">
                <div class="col-12">
                <h3 class="fs-2">${formattedValue}</h3>
                <div class="container">
                    <div class="row">
                    <div class="col-12 col-md-8">
                        <p class="description">${cashIn[i].description}</p>
                    </div>
                    <div class="col-12 col-md-3 d-flex justify-content-end">
                        <span>${formattedDate}
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    }
    document.getElementById("cash-in-list").innerHTML = cashInHtml;
  }
}

///Função para trazer as entradas do tipo 2
function getCashOut() {
  const transactions = data.transactions;
  const cashIn = transactions.filter((item) => item.type === "2");
  //   console.log(cashIn);

  // Mostrar na tela
  if (cashIn.length) {
    let cashInHtml = ``;
    let limit = 0;

    if (cashIn.length > 5) {
      limit = 5;
    } else {
      limit = cashIn.length;
    }

    for (let i = 0; i < limit; i++) {
      //   console.log(i);
      //   console.log(cashIn[i]);

      // Formatação de data adicionando sufixo T00:00:00 para evitar inconsistências de timezone no deploy
      const date = new Date(cashIn[i].date + "T00:00:00");

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      // formatar valores monetários usando toLocaleString em pt-BR
      const formattedValue = Number(cashIn[i].value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      cashInHtml += `
            <div class="row mb-4 p-3 rounded shadow-sm bg-white p-card">
                <div class="col-12">
                <h3 class="fs-2">${formattedValue}</h3>
                <div class="container">
                    <div class="row">
                    <div class="col-12 col-md-8">
                        <p class="description">${cashIn[i].description}</p>
                    </div>
                    <div class="col-12 col-md-3 d-flex justify-content-end">
                        <span>${formattedDate}
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    }
    document.getElementById("cash-out-list").innerHTML = cashInHtml;
  }
}

// Função total
function getTotal() {
  const transactions = data.transactions;
  // console.log(transactions);
  let total = 0;

  transactions.forEach((item) => {
    item.type === "1" ? (total += item.value) : (total -= item.value);
  });

  //variável com o valor formatado
  const formattedTotal = Number(total).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  document.getElementById("total").innerHTML = `${formattedTotal}`;
}

/* Menu hamburger */
const toggler = document.querySelector(".navbar-toggler");
const collapse = document.querySelector("#navbarNavAltMarkup");

toggler.addEventListener("click", () => toggler.classList.toggle("active"));

document.addEventListener("click", (e) => {
  if (toggler.classList.contains("active") && !toggler.contains(e.target) && !collapse.contains(e.target)) {
    toggler.classList.remove("active");
    bootstrap.Collapse.getInstance(collapse)?.hide();
  }
});

window.addEventListener("scroll", () => {
  if (toggler.classList.contains("active")) {
    toggler.classList.remove("active");
    bootstrap.Collapse.getInstance(collapse)?.hide();
  }
});
