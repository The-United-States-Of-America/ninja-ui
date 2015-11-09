export function postJson (url, body) {
  return fetch(url, {
    method: 'post',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}
