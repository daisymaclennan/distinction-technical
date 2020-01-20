import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <Link href='/books'>
      <a>Books</a>
    </Link>
  </Layout>
)
