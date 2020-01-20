import React from 'react'
import Link from 'next/link'
import api from '../../lib/api'
import Layout from '../../components/layout'

const Page = ({ books }) => (
  <Layout>
    <h2>Books</h2>
    <ul>
      {books.map(book => (
        <li key={book.id}>
          <Link href='/books/[id]' as={`/books/${book.id}`}>
            <a>
              {book.title} by
              {book.author.map(author => (
                <p key={author.id}>{author}</p>
              ))}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Page.getInitialProps = async (req) => {
  const books = await api('books')

  return {
    books: books.formattedResults
  }
}

export default Page
