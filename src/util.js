// Formata o valor para ter 02 casas decimais sempre.
export function formatarMoeda(valor) {

    const formatter = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(valor);
}