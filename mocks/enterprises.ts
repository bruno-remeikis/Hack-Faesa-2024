import { Enterprise } from "@/models/Enterprise";

export const enterprisesMock: Enterprise[] = [
    {
        cnpj: '11111111111111',
        name: 'FastClean',
        size: 'Pequena',
        price: 100,
        priceFalling: true,
        stars: 4.5
    }, {
        cnpj: '22222222222222',
        name: 'Limpa Tudo',
        size: 'Média',
        price: 140,
        priceFalling: false,
        stars: 5
    }, {
        cnpj: '33333333333333',
        name: 'Brilhante',
        size: 'Média',
        price: 160,
        priceFalling: false,
        stars: 4
    },
]