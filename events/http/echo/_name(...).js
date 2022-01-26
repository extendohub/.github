export default async ({ events, helpers, log }) => {
  const { request, response } = events.payload
  const handler = handlers[request.method]
  return handler ? handler(request, response, { helpers, log }) : { ...response, status: 404 }
}

const handlers = {
  get: async (request, response, { helpers, log }) => {
    const { resource, path, params } = request
    const current = await helpers.keyValue.get(path)
    log.info(`Hello ${params.name}(${query.who}) from ${resource.typeName} ${resource.name}\nThe value at path: "${path}" is:\n${JSON.stringify(current)}\n`)
    return current
  },
  post: async (request, response, { helpers, log }) => {
    const { path, body, query } = request
    const old = await helpers.keyValue.get(path)
    await helpers.keyValue.set(path, body)
    log.info(`Hello ${params.name}(${query.who}) from ${resource.typeName} ${resource.name}\nSetting value for ${path} to ${JSON.stringify(body)}`)
    return old
  }
}