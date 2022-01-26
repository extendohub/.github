export default async ({ events, log }) => {
  const { resource, method, path, params, query, body } = events.payload.request
  log.info(`Got ${method} to ${path} for ${resource.typeName} ${resource.name}`)
  return { method, path, resource, body, params, query }
}
