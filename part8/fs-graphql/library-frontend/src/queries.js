import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query allAuthors {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`;

export const ALL_BOOKS = gql`
    query allBooks($genre: String) {
        allBooks (genre: $genre) {
            title
            author {
                name
                born
                id
                bookCount
            }
            published
            genres
        }
    }
`;

export const ME = gql`
    query me {
        me {
            username
            favoriteGenre
        }
    }
`;
