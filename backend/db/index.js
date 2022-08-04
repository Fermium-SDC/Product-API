import postgres from 'postgres'
import { myPass, myDomain } from './dbpass'

const sql = postgres({
  host: myDomain,
  port: 5432,
  database: 'test',
  username: 'patman817',
  password: myPass
})

export default sql