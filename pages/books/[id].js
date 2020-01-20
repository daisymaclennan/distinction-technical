import React from 'react'
import { useRouter } from 'next/router'
import api from '../../lib/api'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import Layout from '../../components/layout'
import Review from '../../components/review'
import SingleBookHeader from '../../components/singleBookHeader'

const Page = ({ reviews, books }) => {
  const router = useRouter();

  //Getting the right book for the page
  const book = books.find(function(book){
    return book.id === router.query.id;
  })

  //Write a review form validation
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
      <SingleBookHeader>
        <h2>{book.title}</h2>
        <p>by</p>
        {book.author.map(author => (
          <p key={author.id}>{author}</p>
        ))}
      </SingleBookHeader>

      <h3>Reviews</h3>
      {reviews.map(review => (
        <Review>
          <span>{review.score}/5</span>
          <h4>{review.author_name}</h4>
          <p>{review.content}</p>
        </Review>
      ))}

      {Cookies.get('submittedReview') && (
        <h4>Thanks for submitting your review!</h4>
      )}

      {!Cookies.get('submittedReview') && (
        <>
          <h4>Write a review</h4>
          <Formik
            initialValues={{author_name: '',
                            author_email: '',
                            score: '1',
                            content: ''
                          }}
            onSubmit={async values => {
              await api(`books/${router.query.id}`, {
                method: 'POST',
                body: JSON.stringify({...values, hasSubmitted: Cookies.get('submittedReview')}),
                headers: {
                  'content-type': 'application/json'
                }
              })
              Cookies.set('submittedReview', 'true', {path: ''})
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
        </>
      )}

    </Layout>
)}

Page.getInitialProps = async ({ query }) => {
  const reviews = await api(`books/${query.id}`)
  const books = await api(`books`)

  return {
    reviews: reviews.results,
    books: books.formattedResults
  }
}

export default Page
