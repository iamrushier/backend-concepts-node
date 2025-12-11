# GraphQL Client Examples

## Method 1: Using Apollo Client (Recommended)

### Setup

```bash
pnpm add @apollo/client graphql
```

### `src/apolloClient.ts`

```typescript
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
```

### `src/App.tsx`

```typescript
import { ApolloProvider, useQuery, useMutation, gql } from "@apollo/client";
import { client } from "./apolloClient";

// Define queries
const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $authorId: ID!) {
    createBook(title: $title, authorId: $authorId) {
      id
      title
    }
  }
`;

function BooksList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleCreateBook = async () => {
    await createBook({
      variables: { title: "New Book", authorId: "1" },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Books</h1>
      <button onClick={handleCreateBook}>Add Book</button>
      <ul>
        {data.books.map((book: any) => (
          <li key={book.id}>
            {book.title} by {book.author.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <BooksList />
    </ApolloProvider>
  );
}

export default App;
```

---

## Method 2: Using Plain Fetch (No Library)

### `src/graphqlClient.ts`

```typescript
const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

export async function graphqlQuery(query: string, variables?: any) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}
```

### Usage in Component

```typescript
import { useState, useEffect } from "react";
import { graphqlQuery } from "./graphqlClient";

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await graphqlQuery(`
        query {
          books {
            id
            title
            author {
              name
            }
          }
        }
      `);
      setBooks(data.books);
    };

    fetchBooks();
  }, []);

  const createBook = async () => {
    await graphqlQuery(
      `
        mutation CreateBook($title: String!, $authorId: ID!) {
          createBook(title: $title, authorId: $authorId) {
            id
            title
          }
        }
      `,
      { title: "Mistborn", authorId: "1" }
    );

    // Refetch books
    const data = await graphqlQuery(`query { books { id title } }`);
    setBooks(data.books);
  };

  return (
    <div>
      <button onClick={createBook}>Add Book</button>
      {books.map((book: any) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
```

---

## Method 3: Using Axios

```typescript
import axios from "axios";

const graphqlClient = axios.create({
  baseURL: "http://localhost:4000/graphql",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function query(query: string, variables?: any) {
  const { data } = await graphqlClient.post("", {
    query,
    variables,
  });

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data;
}

// Usage
const books = await query(`
  query {
    books {
      id
      title
    }
  }
`);
```

---

## Key Differences from REST

### REST

```typescript
// Multiple endpoints
const books = await fetch("/api/books");
const author = await fetch(`/api/authors/${authorId}`);
const bookDetails = await fetch(`/api/books/${bookId}`);
```

### GraphQL

```typescript
// Single request, get exactly what you need
const data = await graphqlQuery(`
  query {
    book(id: "1") {
      id
      title
      author {
        id
        name
        books {
          id
          title
        }
      }
    }
  }
`);
```

**Benefits:**

- No over-fetching (get only what you need)
- No under-fetching (get related data in one request)
- Strongly typed
- Self-documenting (schema introspection)
