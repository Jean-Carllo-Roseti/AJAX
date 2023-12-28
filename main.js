$(document).ready(function() {
    $('.cep').mask('00000-000');
    $('.numero').mask('(00)0000-0000');

    $('.cep-button').click(function() {
        const cep = $('.cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`;
        const botao = $(this);

        $(botao).find('i').addClass('d-none');
        $(botao).find('span').removeClass('d-none');

        fetch(endpoint)
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(json) {
            const rua = json.logradouro;
            const bairro = json.bairro;
            const cidade = json.localidade;
            const estado = json.uf;

            $('.rua').val(rua);
            $('.bairro').val(bairro);
            $('.cidade').val(cidade);
            $('.estado').val(estado);

        })
        .catch(function(erro) {
            alert('Ocorreu um erro ao consultar o endereço, tente mais tarde.');
        })
        .finally(function() {
            setTimeout(function() {
                $(botao).find('i').removeClass('d-none');
                $(botao).find('span').addClass('d-none');
            }, 1000)
        })
    })

    $('.formulario').submit(function(evento) {
        evento.preventDefault();

        if ($('.nome').val().length == 0) {
            throw new Error('Digite o nome.')
        }
    })

})