let amigos = [];

function falaCompletamente(texto, callback) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.onend = callback;
        speechSynthesis.speak(utterance);
    } else {
        alert('Seu navegador não suporta síntese de fala.');
        if (callback) callback();
    }
}
function fala(texto) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        speechSynthesis.speak(utterance);
    } else {
        alert('Seu navegador não suporta síntese de fala.');
    }
}

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();
    if (nome) {
        amigos.push(nome);
        atualizarListaAmigos();
        input.value = ''; 
        fala(`Amigo ${nome} adicionado`);
    }
}

function atualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; 
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length > 0) {
        const sorteado = amigos[Math.floor(Math.random() * amigos.length)];
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = `Amigo sorteado: ${sorteado}`;
        fala(`Amigo sorteado é: ${sorteado}`);
        amigos = []; // Limpa a lista de amigos após o sorteio
        atualizarListaAmigos(); // Atualiza a lista para mostrar que está vazia
    } else {
        alert('Adicione pelo menos um nome para sortear.');
        fala('Adicione pelo menos um nome para sortear.');
    }
}

// Função para saudar o usuário quando a página é carregada
window.onload = function() {
    fala('Bem-vindo ao jogo Amigo Secreto. Digite o nome dos seus amigos para começar.');
};