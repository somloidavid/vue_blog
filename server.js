import jsonServer from 'json-server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const SECRET_KEY = 'your-secret-key'
const expiresIn = '1h'

server.use(middlewares)
server.use(jsonServer.bodyParser)

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

server.post('/register', (req, res) => {
  const { name, email, password } = req.body

  if (router.db.get('users').find({ email }).value()) {
    return res.status(400).json({ message: 'Email már használatban van' })
  }

  const hashedPassword = bcrypt.hashSync(password, 8)
  const user = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  }

  router.db.get('users').push(user).write()

  const accessToken = createToken({ email, name })
  res.status(200).json({ token: accessToken, user: { id: user.id, name, email } })
})

server.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = router.db.get('users').find({ email }).value()

  if (!user) {
    return res.status(400).json({ message: 'Felhasználó nem található' })
  }

  const validPassword = bcrypt.compareSync(password, user.password)
  if (!validPassword) {
    return res.status(400).json({ message: 'Hibás jelszó' })
  }

  const accessToken = createToken({ email, name: user.name })
  res.status(200).json({ token: accessToken, user: { id: user.id, name: user.name, email } })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    return res.status(401).json({ message: 'Hiányzó token' })
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1])
    next()
  } catch (err) {
    res.status(401).json({ message: 'Érvénytelen vagy lejárt token' })
  }
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})
