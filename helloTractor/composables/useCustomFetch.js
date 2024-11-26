// useCustomFetch.js
import { ref } from 'vue'
const config = useRuntimeConfig();
// Persistent token storage
const bearerToken = ref(localStorage.getItem('bearerToken') || null)
let mainUrl = config.public.apiURL;
// Custom fetch wrapper with token management
export function useCustomFetch(options = {}) {
  // Prepare headers
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(bearerToken.value ? { 'Authorization': `Bearer ${bearerToken.value}` } : {})
  })

  // Prepare fetch options
  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    ...(options.body ? { body: options.body instanceof FormData ? options.body : JSON.stringify(options.body) } : {})
  }

  // Perform the actual fetch
  return fetch(mainUrl, fetchOptions)
    .then(async (response) => {
      // Handle unauthorized access
      if (response.status === 401) {
        logout()
        throw new Error('Unauthorized access')
      }

      // Handle non-OK responses
      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(errorBody || `HTTP error! status: ${response.status}`)
      }

      // Try to parse JSON, fallback to text
      const contentType = response.headers.get('content-type')
      return contentType && contentType.includes('application/json') ? response.json() : response.text()
    })
    .catch(error => {
      console.error('Fetch error:', error)
      throw error
    })
}

// // Authentication management
// export function useAuth() {
//   // Login - persist token
//   function login(token) {
//     bearerToken.value = token
//     localStorage.setItem('bearerToken', token)
//   }

//   // Logout - clear token
//   function logout() {
//     bearerToken.value = null
//     localStorage.removeItem('bearerToken')
//   }

//   // Get current token
//   function getToken() {
//     return bearerToken.value
//   }

//   return {
//     login,
//     logout,
//     getToken
//   }
// }

// Optionally export the token ref if needed for reactive operations
export const token = bearerToken