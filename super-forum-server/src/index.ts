import {RedisStore} from "connect-redis"
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { AppDataSource } from "./data-source";  // ✅ Go up one level if needed
import { register } from "./repo/UserRepo";
import bodyParser from "body-parser";
import { login } from "./repo/UserRepo";
import { createThread, getThreadsByCategoryId } from "./repo/ThreadRepo";
import typeDefs from "./gql/typeDefs";
import resolvers from "./gql/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";
import http from "http"
import { ApolloServer } from "@apollo/server";
import GqlContext from "./gql/GqlContext";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import {expressMiddleware} from "@as-integrations/express4"
console.log(process.env.NODE_ENV);
require("dotenv").config();
declare module "express-session"{
    interface SessionData{
        userid: string | undefined,
        loadedCount? : number;
    }
}
const main= async ()=> {
const app = express();
const router = express.Router();
await AppDataSource.initialize();
console.log("Successfully connected to database")
const redis = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

const redisStore = new RedisStore({
    client: redis,
})
app.use(bodyParser.json());
app.use(
  session({
    store: redisStore,
    name: process.env.COOKIE_NAME,
    sameSite: "Strict",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  } as any)
);
app.use(router);
router.get("/", (req, res)=>{
  if(!req.session.userid){
    const rawId = req.query.userid;
    if (typeof rawId == 'string'){
      req.session.userid = rawId;
    }
    else if(Array.isArray(rawId) && typeof rawId[0] === 'string'){
      req.session.userid = rawId[0];
    }
    else {
      req.session!.loadedCount = Number (req.session!.loadedCount) + 1;
    }
    res.send (
      `userId: ${req.session!.userid}, loadedCount: ${req.session.loadedCount}`
    );
  }
})
router.post("/register", async(req, res, next)=>{
  try{
    console.log("params", req.body);
    const UserResult = await register(
      req.body.email,
      req.body.userName,
      req.body.password
    );
    if(UserResult && UserResult.user){
      res.send(`new user created, userId: ${UserResult.user.id}`)
    }
    else if( UserResult && UserResult.messages){
      res.send(UserResult.messages[0]);
    }
    else{
      next();
    }
  }
  catch (ex){
    res.send((ex as Error).message);
  }
})

router.post("/login", async (req,res, next)=>{
  try{
    console.log("params", req.body);
    const UserResult = await login(req.body.userName, req.body.password);
    if(UserResult && UserResult.user){
      req.session.userid= UserResult.user.id;
      res.send(`User logged in, user id: ${req.session.userid}`); 
    }
    else if (UserResult && UserResult.messages){
      res.send(UserResult.messages[0])
    }
    else {
      next();
    }
  }
  catch(ex){
    res.send((ex as Error).message);
  }
})
router.post("/createThread", async (req, res)=>{
  try {
    console.log("Session Data:", req.session);
    console.log("Request Body:", req.body);

  

    // Ensure userid is a string
    const userId: string |undefined = req.session.userid;
    console.log("Session Data:", req.session);
    console.log("UserID:", req.session?.userid);

    // Call createThread function
    const msg = await createThread(userId, req.body.categoryId, req.body.title, req.body.body);

    // Send response
    res.send(msg);
  }
  catch (ex) {
    console.error("Error in /createThread:", ex);

    // Ensure only one response is sent
    if (!res.headersSent) {
      res.status(500).json({ error: (ex as Error).message });
    }
  }
})

router.post("/threadbycategory", async(req, res)=>{
  try {
    const threadResult = await getThreadsByCategoryId(req.body.categoryId);
    if(threadResult && threadResult.entities){
      let items= "";
      threadResult.entities.forEach((th) => {
        items+= th.title + ", ";
      });
      res.send(items)
    }
    else if(threadResult && threadResult.messages){
      res.send(threadResult.messages[0])
    };
  }
  catch(ex){
    console.log(ex);
    res.send((ex as Error).message);
  }
});
const schema = makeExecutableSchema ({
  typeDefs, resolvers
});
const httpServer = http.createServer(app);
const apolloServer = new ApolloServer<GqlContext>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
})
await apolloServer.start();
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(apolloServer, {
    context: async({req, res}) : Promise<GqlContext> => ({req, res})
  })
);

httpServer.listen({ port: process.env.SERVER_PORT }, () => {
  console.log(`Server ready on port ${process.env.SERVER_PORT}`);
});}

main();