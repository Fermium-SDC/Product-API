import postgres from 'postgres'
import { myPass, myDomain } from './dbpass'

const sql = postgres({
  host: myDomain,
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: myPass
})

export default sql