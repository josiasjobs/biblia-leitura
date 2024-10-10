// Função para alternar a exibição da seção
function toggleSection() {
    const section = document.querySelector('.buttons-section');
    section.style.display = (section.style.display === 'none' || section.style.display === '') ? 'block' : 'none';
}

// Exemplo de funções exportProgress e importProgress
function exportProgress() {
    console.log("Progresso exportado");
}

function importProgress(event) {
    console.log("Progresso importado");
}



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




function printProgress() {
    const books = {
        hebrew: [

            { name: 'Gênesis', chapters: 50 },
            { name: 'Êxodo', chapters: 40 },
            { name: 'Levítico', chapters: 27 },
            { name: 'Números', chapters: 36 },
            { name: 'Deuteronômio', chapters: 34 },
            { name: 'Josué', chapters: 24 },
            { name: 'Juízes', chapters: 21 },
            { name: 'Rute', chapters: 4 },
            { name: '1 Samuel', chapters: 31 },
            { name: '2 Samuel', chapters: 24 },
            { name: '1 Reis', chapters: 22 },
            { name: '2 Reis', chapters: 25 },
            { name: '1 Crônicas', chapters: 29 },
            { name: '2 Crônicas', chapters: 36 },
            { name: 'Esdras', chapters: 10 },
            { name: 'Neemias', chapters: 13 },
            { name: 'Ester', chapters: 10 },
            { name: 'Jó', chapters: 42 },
            { name: 'Salmos', chapters: 150 },
            { name: 'Provérbios', chapters: 31 },
            { name: 'Eclesiastes', chapters: 12 },
            { name: 'Cânticos', chapters: 8 },
            { name: 'Isaías', chapters: 66 },
            { name: 'Jeremias', chapters: 52 },
            { name: 'Lamentações', chapters: 5 },
            { name: 'Ezequiel', chapters: 48 },
            { name: 'Daniel', chapters: 12 },
            { name: 'Oséias', chapters: 14 },
            { name: 'Joel', chapters: 3 },
            { name: 'Amós', chapters: 9 },
            { name: 'Obadias', chapters: 1 },
            { name: 'Jonas', chapters: 4 },
            { name: 'Miquéias', chapters: 7 },
            { name: 'Naum', chapters: 3 },
            { name: 'Habacuque', chapters: 3 },
            { name: 'Sofonias', chapters: 3 },
            { name: 'Ageu', chapters: 2 },
            { name: 'Zacarias', chapters: 14 },
            { name: 'Malaquias', chapters: 4 }


        ],
        greek: [

            { name: 'Mateus', chapters: 28 },
            { name: 'Marcos', chapters: 16 },
            { name: 'Lucas', chapters: 24 },
            { name: 'João', chapters: 21 },
            { name: 'Atos', chapters: 28 },
            { name: 'Romanos', chapters: 16 },
            { name: '1 Coríntios', chapters: 16 },
            { name: '2 Coríntios', chapters: 13 },
            { name: 'Gálatas', chapters: 6 },
            { name: 'Efésios', chapters: 6 },
            { name: 'Filipenses', chapters: 4 },
            { name: 'Colossenses', chapters: 4 },
            { name: '1 Tessalonicenses', chapters: 5 },
            { name: '2 Tessalonicenses', chapters: 3 },
            { name: '1 Timóteo', chapters: 6 },
            { name: '2 Timóteo', chapters: 4 },
            { name: 'Tito', chapters: 3 },
            { name: 'Filemom', chapters: 1 },
            { name: 'Hebreus', chapters: 13 },
            { name: 'Tiago', chapters: 5 },
            { name: '1 Pedro', chapters: 5 },
            { name: '2 Pedro', chapters: 3 },
            { name: '1 João', chapters: 5 },
            { name: '2 João', chapters: 1 },
            { name: '3 João', chapters: 1 },
            { name: 'Judas', chapters: 1 },
            { name: 'Apocalipse', chapters: 22 }
        ]
    };

    let printWindow = window.open('', '', 'height=500, width=800');
    printWindow.document.write('<html><head><title>Progresso de Leitura</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
        body {
            font-family: Arial, sans-serif;
            color: #333;
        }
        h1, h2, h3 {
            text-align: center;
            color: #005f73;
        }
        .book-container {
            page-break-inside: avoid;
            margin-bottom: 20px;
        }
        ul {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
            gap: 10px;
            list-style: none;
            padding: 0;
        }
        li {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            background-color: #e0f7fa;
            border: 1px solid #b2ebf2;
            border-radius: 5px;
            padding: 10px;
            text-align: center;
        }
        input[type="checkbox"] {
            margin-right: 5px;
        }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<h1>Progresso de Leitura da Bíblia</h1>');

    // Hebraico
    printWindow.document.write('<h2>ESCRITURAS HEBRAICO-ARAMAICAS</h2>');
    books.hebrew.forEach(book => {
        printWindow.document.write('<div class="book-container"><h3>' + book.name + '</h3><ul>');
        for (let i = 1; i <= book.chapters; i++) {
            printWindow.document.write('<li><input type="checkbox"> ' + i + '</li>');
        }
        printWindow.document.write('</ul></div>');
    });

    // Grego
    printWindow.document.write('<h2>ESCRITURAS GREGAS CRISTÃS</h2>');
    books.greek.forEach(book => {
        printWindow.document.write('<div class="book-container"><h3>' + book.name + '</h3><ul>');
        for (let i = 1; i <= book.chapters; i++) {
            printWindow.document.write('<li><input type="checkbox"> ' + i + '</li>');
        }
        printWindow.document.write('</ul></div>');
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
