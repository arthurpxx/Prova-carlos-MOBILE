import app from "./app";
import MovieController from "./controller/movieController";
import UserController from "./controller/UserController";

const userController = new UserController()
const movieController = new MovieController()

app.post('/signup', userController.signup)
app.post('/login', userController.login)
app.get('/movies', movieController.getmovies)
app.get('/products', movieController.getproducts)
app.post('/ticket', userController.buy_ticket)
app.post('/product', userController.buy_product)