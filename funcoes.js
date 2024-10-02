function toggleTabela(tabelaId) {
    var tabela = document.getElementById(tabelaId);
    if (tabela.style.display === "none" || tabela.style.display === "") {
        tabela.style.display = "block"; // Mostra a tabela
    } else {
        tabela.style.display = "none"; // Oculta a tabela
    }
}

// Função para abrir o modal e exibir os capítulos
function openModal(livro, totalChapters) {
    var modal = document.getElementById("modal");
    var modalTitle = document.getElementById("modal-title");
    var chaptersContainer = document.getElementById("chapters-container");

    modal.style.display = "block";

    // Definir título e capítulos
    modalTitle.innerHTML = "Capítulos de " + livro.charAt(0).toUpperCase() + livro.slice(1);
    chaptersContainer.innerHTML = '';

    // Adicionar capítulos em grid com checkbox
    for (var i = 1; i <= totalChapters; i++) {
        var chapterLabel = document.createElement("label");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = livro + "_capitulo_" + i;

        // Carregar progresso salvo do localStorage
        if (localStorage.getItem(checkbox.id) === "true") {
            checkbox.checked = true;
        }

        checkbox.onchange = function () {
            salvarProgressoCapitulo(this.id, this.checked);
        };

        chapterLabel.appendChild(checkbox);
        chapterLabel.appendChild(document.createTextNode(i));
        chaptersContainer.appendChild(chapterLabel);
    }
}

// Função para fechar o modal
function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Fechar o modal se clicar fora dele
window.onclick = function (event) {
    var modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Salvar progresso dos capítulos no localStorage
function salvarProgressoCapitulo(capitulo, status) {
    localStorage.setItem(capitulo, status);
}

// Função de exportação de progresso
function exportProgress() {
    var progresso = {};


    // Exportar progresso dos capítulos
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.includes("_capitulo_")) {
            progresso[key] = localStorage.getItem(key);
        }
    }

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progresso));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "progresso_biblia.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Função de importação de progresso
function importProgress(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var progresso = JSON.parse(e.target.result);

        
        // Restaurar progresso dos capítulos
        Object.keys(progresso).forEach(function (key) {
            if (key.includes("_capitulo_")) {
                localStorage.setItem(key, progresso[key]);
                var chapterCheckbox = document.getElementById(key);
                if (chapterCheckbox) {
                    chapterCheckbox.checked = progresso[key] === "true";
                }
            }
        });

        alert("Progresso importado com sucesso! Recarregue a página para ver as mudanças.");
    };

    reader.readAsText(file);
}

