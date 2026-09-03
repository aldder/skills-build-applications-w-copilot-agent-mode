const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(component) {
  return `${apiOrigin}/api/${component}/`
}

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.docs)) return payload.docs
  if (payload.data && Array.isArray(payload.data.docs)) return payload.data.docs
  return []
}

export async function fetchCollection(component) {
  const response = await fetch(apiUrl(component))
  if (!response.ok) throw new Error(`Unable to load ${component}.`)
  return responseItems(await response.json())
}