import Fastify from 'fastify'
import serveStatic from '@fastify/static'
import process from "node:process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(path.dirname(__dirname), 'public')

console.log(publicDir)

const webserver = Fastify({ logger: true })

webserver.register(serveStatic, { root: publicDir, prefix: "/"})
webserver.register(serveStatic, { root: path.join(publicDir, "css"), prefix: "/css/", decorateReply: false});
webserver.register(serveStatic, { root: path.join(publicDir, "js"), prefix: "/js/", decorateReply: false});
webserver.register(serveStatic, { root: path.join(publicDir, "metroui"), prefix: "/metroui/", decorateReply: false});
webserver.register(serveStatic, { root: path.join(publicDir, "pages"), prefix: "/pages/", decorateReply: false});

// Declare a route
webserver.get('/', async function handler (request, reply) {
    return reply.sendFile('index.html')
})

// Run the server!
try {
    await webserver.listen({ port: 3000 })
} catch (err) {
    webserver.log.error(err)
    process.exit(1)
}