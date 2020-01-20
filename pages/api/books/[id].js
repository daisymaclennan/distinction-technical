const sql = require('sql-template-strings')
const { query } = require('../../../lib/db')

export default async (req, res) => {
  if(req.method = "GET"){
    //Gets all reviews with the same book id
    //If I have time I will join the book information to the reviews so I can display it on the page too
    const results = await query(sql`
      SELECT
          *
      FROM
        reviews
      WHERE
        book_id = ${req.query.id}
    `)

    // If there is an error executing the sql statement it will stop the program
    if (results.error) {
      console.log('Db error', results.error)
      return
    }

    // Return a list of entries.
    res.json({results})
  }

  /*if(req.method = "POST"){
  }*/
}