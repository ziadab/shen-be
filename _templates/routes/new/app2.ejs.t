---
inject: true
to: src/app.ts
before: dotenv.config()
---
import <%= name %>Router from "./routes/<%= name %>.router"

