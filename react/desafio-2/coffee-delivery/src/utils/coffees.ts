export interface Coffee {
  id: number
  name: string
  desc: string
  image: string
  labels: Array<string>
  value: number
}

export const coffeesList: Coffee[] = [
  {
    id: 1,
    name: 'Expresso Tradicional',
    desc: 'O tradicional café feito com água quente e grãos moídos',
    image: './images/coffee/expresso.svg',
    labels: ['tradicional'],
    value: 9.9,
  },
  {
    id: 2,
    name: 'Expresso Americano',
    desc: 'Expresso diluído, menos intenso que o tradicional',
    image: './images/coffee/americano.svg',
    labels: ['tradicional'],
    value: 9.9,
  },
  {
    id: 3,
    name: 'Expresso Cremoso',
    desc: 'Café expresso tradicional com espuma cremosa',
    image: './images/coffee/expresso_cremoso.svg',
    labels: ['tradicional'],
    value: 9.9,
  },
  {
    id: 4,
    name: 'Expresso Gelado',
    desc: 'Bebida preparada com café expresso e cubos de gelo',
    image: './images/coffee/cafe_gelado.svg',
    labels: ['tradicional', 'gelado'],
    value: 9.9,
  },
  {
    id: 5,
    name: 'Café com Leite',
    desc: 'Meio a meio de expresso tradicional com leite vaporizado',
    image: './images/coffee/cafe_com_leite.svg',
    labels: ['tradicional', 'com leite'],
    value: 9.9,
  },
  {
    id: 6,
    name: 'Latte',
    desc: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    image: './images/coffee/latte.svg',
    labels: ['tradicional', 'com leite'],
    value: 9.9,
  },
  {
    id: 7,
    name: 'Capuccino',
    desc: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    image: './images/coffee/capuccino.svg',
    labels: ['tradicional', 'com leite'],
    value: 9.9,
  },
  {
    id: 8,
    name: 'Macchiato',
    desc: 'Café expresso misturado com um pouco de leite quente e espuma',
    image: './images/coffee/macchiato.svg',
    labels: ['tradicional', 'com leite'],
    value: 9.9,
  },
  {
    id: 9,
    name: 'Mocaccino',
    desc: 'Café expresso com calda de chocolate, pouco leite e espuma',
    image: './images/coffee/mocaccino.svg',
    labels: ['tradicional', 'com leite'],
    value: 9.9,
  },
  {
    id: 10,
    name: 'Chocolate Quente',
    desc: 'Bebida feita com chocolate dissolvido no leite quente e café',
    image: './images/coffee/chocolate_quente.svg',
    labels: ['especial', 'com leite'],
    value: 9.9,
  },
  {
    id: 11,
    name: 'Cubano',
    desc: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    image: './images/coffee/cubano.svg',
    labels: ['especial', 'alcoólico', 'gelado'],
    value: 9.9,
  },
  {
    id: 12,
    name: 'Havaiano',
    desc: 'Bebida adocicada preparada com café e leite de coco',
    image: './images/coffee/havaiano.svg',
    labels: ['especial'],
    value: 9.9,
  },
  {
    id: 13,
    name: 'Árabe',
    desc: 'Bebida preparada com grãos de café árabe e especiarias',
    image: './images/coffee/arabe.svg',
    labels: ['especial'],
    value: 9.9,
  },
  {
    id: 14,
    name: 'Irlandês',
    desc: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    image: './images/coffee/irlandes.svg',
    labels: ['especial', 'alcoólico'],
    value: 9.9,
  },
]
