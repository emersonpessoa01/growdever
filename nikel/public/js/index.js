// Login de usuário
const myModal = new bootstrap.Modal(document.getElementById("register-modal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

// Verificar se está logado
checkLogged();

document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  // console.log(email,password,session);

  //  recuperar os dados do localStorage
  const account = getAccount(email);

  if (!account) {
    alert("Ops! Verifique o seu usuário ou senha.");
    return;
  }
  // validar usuario e senha
  if (account.login !== email || account.password !== password) {
    alert("Ops! Verifique o seu usuário ou senha.");
    return;
  }
  saveSession(email, checkSession);
  window.location.href = "home.html";
});

//Criar conta

document.getElementById("create-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length <= 5) {
    alert("Preencha um email válido");
    return;
  }
  if (password.length < 4) {
    alert("A senha deve ter no mínimo 4 caracteres");
    return;
  }

  // Verificar se o e-mail já foi cadastrado
  const usuarioExistente = localStorage.getItem(email);

  if(usuarioExistente){
    alert("E-mail já cadastrado");
     return;
  }
  

  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });
  event.target.reset();
  
  myModal.hide();
  

  alert(`Conta criada com sucesso!\nEmail: ${email}`);
});

//Checar se está logado
  function checkLogged() {
    if (session) {
      sessionStorage.setItem("logged", session);
      logged = session;
    }
    if (logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
  }

// Salvar dados da conta
function saveAccount(data) {
  //   console.log(data);
  //  salvar os dados no localStorage
  localStorage.setItem(data.login, JSON.stringify(data));
}
// Salvar sessão
function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  } else {
    sessionStorage.setItem("logged", data);
  }
}

// Obter dados da conta
function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    //  converter de volta para objeto
    return JSON.parse(account);
  }
  return "";
}
