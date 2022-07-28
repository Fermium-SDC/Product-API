import postgres from 'postgres'

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'test',
  username: 'patman817',
})

export default sql