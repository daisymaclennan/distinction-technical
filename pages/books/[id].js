import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import api from '../../lib/api'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'

const Page = ({ reviews }) => {
  const router = useRouter();

  const Validation = Yup.object().shape({
    author_name: Yup.string()
      .required('Required'),
    author_email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    content: Yup.string()
      .required('Required'),
    score: Yup.string()
      .required('Required'),
  })
  return(
    <Layout>

      {reviews.map(review => (
        <div>
          <span>{review.score}</span>
          <h3>{review.author_name}</h3>
          <p>{review.content}</p>
        </div>
      ))}

      <h2>Write a review</h2>
      <Formik
        initialValues={{author_name: '',
                        author_email: '',
                        score: '1',
                        content: ''
                      }}
        onSubmit={async values => {
          await api(`books/${router.query.id}`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'content-type': 'application/json'
            }
          })
        }}
        validationSchema={Validation}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='author_name'>Name:</label>
              <Field type='text' name='author_name' />
              <ErrorMessage name='author_name' />
            </div>
            <div>
              <label htmlFor='author_email'>Email address:</label>
              <Field type='text' name='author_email' />
              <ErrorMessage name='author_email' />
            </div>
            <div>
              <label htmlFor='score'>Score:</label>
              <Field as="select" name='score'>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Field>
              <ErrorMessage name='score' />
            </div>
            <div>
              <label htmlFor='content'>What did you think?</label>
              <Field as="textarea" name='content' />
              <ErrorMessage name='content' />
            </div>
            <button type='submit'>Submit review</button>
          </form>
        )}
      </Formik>


    </Layout>
)}

Page.getInitialProps = async ({ query }) => {
  const reviews = await api(`books/${query.id}`)

  return {
    reviews: reviews.results
  }
}

export default Page
