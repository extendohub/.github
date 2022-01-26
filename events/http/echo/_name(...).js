export default async ({ events, helpers, context, log }) => {
  const { request, response } = events.payload
  request.params = context.config.params
  const handler = handlers[request.method]
  return handler ? handler(request, response, { helpers, log }) : { ...response, status: 404 }
}

const handlers = {
  get: async (request, response, { helpers, log }) => {
    const { resource, path, params, query } = request
    const current = await helpers.keyValue.get(path)
    log.info(`Hello ${params.name}(${query.who}) from ${resource.typeName} ${resource.name}\nThe value at path: "${path}" is:\n${JSON.stringify(current)}\n`)
    return current
  },
  post: async (request, response, { helpers, log }) => {
    const { path, body, params, query } = request
    const old = await helpers.keyValue.get(path)
    await helpers.keyValue.set(path, body)
    log.info(`Hello ${params.name}(${query.who}) from ${resource.typeName} ${resource.name}\nSetting value for ${path} to ${JSON.stringify(body)}`)
    return old
  }
}