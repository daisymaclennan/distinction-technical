const sql = require('sql-template-strings')
const { query } = require('../../../lib/db')

export default async (req, res) => {
  const results = await query(sql`
    SELECT
      *
    FROM
      books
  `)

  // Return a list of entries.
  res.json([
    {
      id: 1,
      title: 'Harvest',
      author: 'Jim Crace'
    },
    {
      id: 2,
      name: 'Danubia',
      slug: 'Simon Winder'
    }
  ])
}
