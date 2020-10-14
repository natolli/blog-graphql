import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express';
import Express from 'express'
import {buildSchema} from 'type-graphql'
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import {LoginResolver} from './modules/user/Login'
import { MeResolver } from "./modules/user/Me";
import {ConfirmUserResolver} from './modules/user/ConfirmUser'
import session from 'express-session'
import {redis} from './redis'
import connectRedis from 'connect-redis'
import cors from 'cors'

const main =async () =>{

    await createConnection();

    const schema = await buildSchema({
        resolvers:[MeResolver,LoginResolver,RegisterResolver,ConfirmUserResolver]
    })

    const apolloServer = new ApolloServer({schema,
        context:({req}: any)=> ({req})
    })

    const app = Express();

    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials:true,
            origin: "http://localhost:3000"
        })
    )

    app.use(
        session({
            store:new RedisStore({
                client: redis as any
            }), 
            name: 'qid',
            secret: 'ofgasdfigsf',
            resave:false,
            saveUninitialized: false,
            cookie:{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }
        })
    )

    apolloServer.applyMiddleware({app})

    app.listen(4000, ()=>{
        console.log('server started on 4000')
        
    })
}

main();