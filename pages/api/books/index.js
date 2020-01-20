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
  res.json({results})
}
