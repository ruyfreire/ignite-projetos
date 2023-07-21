import { CardBookReview } from "./CardBookReview"

export function RecentReviews() {
  return (
    <div>
      <h3 className="mb-4 text-sm leading-relaxed">Avaliações mais recentes</h3>

      <ul className="flex flex-1 flex-col gap-3">
        <li>
          <CardBookReview
            rating={4}
            date="Hoje"
            user={{
              name: "Jaxson Dias",
              username: "jaxson_dias",
              avatarUrl: "/profile.svg",
            }}
            book={{
              title: "O Hobbit",
              author: "J.R.R. Tolkien",
              imageUrl: "/books/o-hobbit.png",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis lorem mi, vehicula efficitur purus porttitor ut. Integer sollicitudin purus in mauris venenatis venenatis. Phasellus eget augue ac tortor tempor malesuada a maximus erat. Quisque quis convallis felis. Cras a mauris in sem sodales interdum. Curabitur lobortis odio eu commodo venenatis. In consectetur erat vitae ante convallis feugiat. Morbi feugiat eros vitae nulla congue dictum. Proin porttitor lacinia consectetur. Praesent pharetra sagittis nunc, eget tincidunt purus commodo nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
              linkMore: "/livro/o-hobbit",
            }}
          />
        </li>

        <li>
          <CardBookReview
            rating={4}
            date="Ontem"
            user={{
              name: "Brandon Botosh",
              username: "brandon_botosh",
              avatarUrl: "/profile.svg",
            }}
            book={{
              title: "O guia do mochileiro das galáxias",
              author: "Douglas Adams",
              imageUrl: "/books/o-guia-do-mochileiro-das-galaxias.png",
              description:
                "Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta eget nec vitae sit vulputate eget",
            }}
          />
        </li>

        <li>
          <CardBookReview
            rating={4}
            date="Ontem"
            user={{
              name: "Lindsey Philips",
              username: "lindsey_philips",
              avatarUrl: "/profile.svg",
            }}
            book={{
              title: "Entendendo Algoritmos",
              author: "Aditya Bhargava",
              imageUrl: "/books/entendendo-algoritmos.png",
              description:
                "Integer at tincidunt sed mi. Venenatis nunc justo porta viverra lacus scelerisque ut orci ultricies. Massa ultrices lacus non lectus pellentesque cras posuere neque. Nunc nisl curabitur et non. Tellus senectus elit porta lorem.",
            }}
          />
        </li>
      </ul>
    </div>
  )
}
