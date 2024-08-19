import axios from 'axios'

const num_requests = 100

async function makeRequestTooBusy() {
  const requests = []

  for (let index = 0; index < num_requests; index++) {
    requests.push(axios.post('http://localhost:3000/security-route'))
  }

  await Promise.all(requests)
  console.log("All requests completed.")
}

makeRequestTooBusy()