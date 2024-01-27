import compression from "compression"
import bodyParser from "body-parser"
import helmet from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser"
import corsOptions from "../../config/corsOptions.js"
export default function expressConfig(app) {
  //app.use(express.json());
  // security middleware
  app.use(helmet())

  app.use(compression())
  // CORS Middleware
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  )

  app.use(bodyParser.json({ limit: "50mb" }))
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  )

  app.use(cookieParser())

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    )
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-type, Authorization, Cache-control, Pragma"
    )
    // Pass to next layer of middleware
    next()
  })
  //Logger here
}
