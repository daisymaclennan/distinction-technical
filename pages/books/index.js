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
          <Link href='/book/[id]' as={`/directory/${book.id}`}>
            <a>{book.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Page.getInitialProps = async (req) => {
  const books = await api('books')

  return {
    books: books.results
  }
}

export default Page
