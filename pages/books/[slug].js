import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import api from '../../lib/api'

const Page = ({ entry }) => (
  <Layout>
    <h2>{entry.name}</h2>
  </Layout>
)

Page.getInitialProps = async ({ query }) => {
  const entry = await api(`directory/${query.slug}`)

  return {
    entry: entry
  }
}

export default Page
