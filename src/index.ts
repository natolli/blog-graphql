import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import { redis } from "./redis";
import connectRedis from "connect-redis";
import cors from "cors";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  const redisSecret = "hello";

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),

      name: "qid",
      secret: redisSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: false,
    bodyParserConfig: { limit: "50mb" },
  });

  app.listen(4000, () => {
    console.log("server started on 4000");
  });
};

main();
