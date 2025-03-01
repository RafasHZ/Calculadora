let display = document.getElementById("display");
let historyList = document.getElementById("history-list");

// Adiciona valores no display
function appendValue(value) {
    if (value === "%" && display.value !== "") {
        display.value = (parseFloat(display.value) / 100).toString();
    } else {
        display.value += value;
    }
}

// Limpa o display
function clearDisplay() {
    display.value = "";
}

// Apaga o último caractere
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        let expression = display.value.replace(/x/g, '*');
        let result = eval(expression); 
        let operation = `${display.value} = ${result}`;
        display.value = result;

        // Adiciona ao histórico
        let listItem = document.createElement("li");
        listItem.textContent = operation;
        historyList.prepend(listItem);

        // Mantém apenas os últimos 5 cálculos
        if (historyList.children.length > 5) {
            historyList.removeChild(historyList.lastChild);
        }
    } catch {
        display.value = "Erro";
        setTimeout(() => display.value = "", 1500);
    }
}
// Modo claro e escuro
function toggleTheme() {
    var moonIcon = document.getElementById('moon-icon');
    var sunIcon = document.getElementById('sun-icon');
    
    // Troca a opacidade e visibilidade para fazer a transição suave
    if (moonIcon.style.opacity === '1') {
        moonIcon.style.opacity = '0';
        moonIcon.style.visibility = 'hidden';
        sunIcon.style.opacity = '1';
        sunIcon.style.visibility = 'visible';
    } else  { 
        sunIcon.style.opacity = '0';
        sunIcon.style.visibility = 'hidden';
        moonIcon.style.opacity = '1';
        moonIcon.style.visibility = 'visible';
    }

    // Alterna o modo escuro
    document.body.classList.toggle('dark-mode');
}

// Exibe e oculta o modal de histórico
function toggleHistory() {
    const modal = document.getElementById("history-modal");
    
    // Verifica o estado atual e alterna entre 'none' e 'flex'
    if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById("history-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
