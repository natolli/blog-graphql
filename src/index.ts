import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express';
import Express from 'express'
import {buildSchema} from 'type-graphql'

import { HelloResolver } from './modules/user/Hello';


const main =async () =>{
    const schema = await buildSchema({
        resolvers:[HelloResolver]
    })

    const apolloServer = new ApolloServer({schema})

    const app = Express();

    apolloServer.applyMiddleware({app})

    app.listen(4000, ()=>console.log('server started on 4000'))
}

main();