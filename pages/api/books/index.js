const sql = require('sql-template-strings')
const { query } = require('../../../lib/db')

export default async (req, res) => {
  const results = await query(sql`
    SELECT
        concat(
        '{',
        concat('"id": "', books.id,'",'),
        concat('"title": "', books.title,'",'),
        concat('"author": [', GROUP_CONCAT(concat('"',authors.name, '"')), ']'),
        '}'
      ) as book
    FROM
        books
            LEFT JOIN
        relationships ON books.id = relationships.book_id
            LEFT JOIN
        authors ON authors.id = relationships.author_id
    GROUP BY books.id
  `)

  if(results.error){
    console.log('Db error', messyResults.error)
    return
  }

  const formattedResults = [];

  results.map((i) => {
    formattedResults.push(JSON.parse(i.book))
  })

  console.log(formattedResults)

  // Return a list of entries.
  res.json({formattedResults})
}
