import { createApp } from '../presentation/http/create-app.js'
import { container } from './container.js'

// The Express app, used by the local server, the Vercel function and the tests.
export default createApp(container)
