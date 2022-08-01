import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 100,
  duration: '15s',
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  http.get(`http://localhost:3000/api/products/${Math.floor(Math.random() * (1000000 - 900000) + 900000)}/styles`);
  sleep(0.5)
}