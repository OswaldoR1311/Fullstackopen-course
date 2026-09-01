const typeDefs = /* GraphQL */ `

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        born: Int
        name: String!
        id: ID!
        bookCount: Int!
    }

  type Query {
    booksCount: Int
    authorsCount: Int
    allBooks(author: String): [Book!]! #(Primera modificacion)
    # allBooks(author: String, genre: String):[Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int): Author!
  }
`;

export default typeDefs;
