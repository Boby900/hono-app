import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/books', (c) => {
  return c.text('Hello books!')
})
app.get('/cats', (c) => {
  return c.text('Hello cats!')
})
app.notFound((c) => {
  return c.text('Oops, 404 Message', 404)
})

app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  c.header('X-Response-Time', `${ms}ms`)
  console.log(ms)

})

Deno.serve({ port: 8787 }, app.fetch) 
