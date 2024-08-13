export function request(method: string, url: string) {
    return fetch(`http://localhost:3000/${url}`, {
        method
    })
  }