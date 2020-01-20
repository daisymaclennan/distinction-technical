import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import api from '../../lib/api'

const Page = ({ reviews }) => (
  <Layout>
  
    {reviews.map(review => (
      <div>
        <h3>{review.author_name}</h3>
        <p>{review.content}</p>
      </div>
    ))}

  </Layout>
)

Page.getInitialProps = async ({ query }) => {
  const reviews = await api(`books/${query.id}`)

  return {
    reviews: reviews.results
  }
}

export default Page
