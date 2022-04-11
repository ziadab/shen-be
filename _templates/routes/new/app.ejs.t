---
inject: true
to: src/app.ts
before: export default app
---
app.use("/<%= name %>", <%= name %>Router)
