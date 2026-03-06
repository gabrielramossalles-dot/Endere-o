async function buscarDados() {
    // 1. Pega o valor do input e remove qualquer caractere que não seja número
    const cep = document.getElementById('cepInput').value.replace(/\D/g, '');
    const telaResultado = document.getElementById('resultado');

    // 2. Valida se tem 8 dígitos
    if (cep.length !== 8) {
        alert("Por favor, digite um CEP com 8 números.");
        return;
    }

    try {
        // 3. Faz a chamada à API (Importante: usar https)
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // 4. Verifica se o CEP existe
        if (dados.erro) {
            alert("CEP não encontrado.");
            telaResultado.classList.add('hidden');
            return;
        }

        // 5. Preenche os campos no HTML
        document.getElementById('rua').innerText = dados.logradouro;
        document.getElementById('bairro').innerText = dados.bairro;
        document.getElementById('cidade').innerText = dados.localidade;
        document.getElementById('estado').innerText = dados.uf;
        document.getElementById('cepFinal').innerText = dados.cep;

        // 6. Mostra o container de resultado
        telaResultado.classList.remove('hidden');

    } catch (erro) {
        console.error("Erro na busca:", erro);
        alert("Erro ao consultar o servidor. Tente novamente.");
    }
}