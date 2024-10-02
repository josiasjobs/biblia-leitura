// Função para alternar a visibilidade da tabela
    function toggleTable(tableId) {
        var table = document.getElementById(tableId);
        table.style.display = (table.style.display === "none" || table.style.display === "") ? "table" : "none";
    }

// Inicializa as tabelas como ocultas
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("profetas").style.display = "none";
        document.getElementById("gregas").style.display = "none";

// Função para salvar o estado dos checkboxes e a data
function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const dateId = checkbox.id + '_data';
        const dateText = document.getElementById(dateId).innerText;
        localStorage.setItem(checkbox.id, checkbox.checked);
        localStorage.setItem(dateId, dateText);
    });
}

// Função para carregar o estado dos checkboxes e a data
function loadProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const checked = localStorage.getItem(checkbox.id) === 'true';
        checkbox.checked = checked;

        const dateId = checkbox.id + '_data';
        const dateText = localStorage.getItem(dateId);
        if (dateText) {
            document.getElementById(dateId).innerText = dateText;
        }
    });
}

// Carregar o progresso ao abrir a página
window.onload = loadProgress;

// Função para marcar a data ao clicar no checkbox
function marcarData(id) {
    const checkbox = document.getElementById(id);
    const dateId = id + '_data';
    const now = new Date();

    if (checkbox.checked) {
        const formattedDate = now.toLocaleDateString('pt-BR');
        document.getElementById(dateId).innerText = formattedDate;
    } else {
        document.getElementById(dateId).innerText = '';
    }

    saveProgress(); // Salva o progresso após alteração
}

// Exportar o progresso para um arquivo JSON
function exportProgress() {
    const progress = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const dateId = checkbox.id + '_data';
        progress[checkbox.id] = {
            checked: checkbox.checked,
            date: document.getElementById(dateId).innerText
        };
    });

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "progresso_biblia.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Importar o progresso de um arquivo JSON
function importProgress(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const progress = JSON.parse(event.target.result);
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            const data = progress[checkbox.id];
            if (data) {
                checkbox.checked = data.checked;
                const dateId = checkbox.id + '_data';
                document.getElementById(dateId).innerText = data.date || '';
                localStorage.setItem(checkbox.id, checkbox.checked);
                localStorage.setItem(dateId, data.date || '');
            }
        });
    };
    reader.readAsText(file);
}
