export default async ({ events, context, log }) => {
  const { resource, method, path, query, body } = events.payload.request
  log.info(`Got ${method} to ${path} for ${resource.typeName} ${resource.name}`)
  return { method, path, resource, body, params: context.config.params, query }
}
