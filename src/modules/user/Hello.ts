import { Arg, Query, Resolver } from 'type-graphql';


@Resolver()
export class HelloResolver{

    @Query(()=>String)
    async hello(@Arg('name') name:string){
        return `Hello, ${name}`
    }


}