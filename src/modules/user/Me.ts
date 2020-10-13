import { MyContext } from '../../types/MyContext';
import { Ctx, Query, Resolver } from "type-graphql";
import {User} from '../../entity/User'


@Resolver()
export class MeResolver{
    @Query(()=>User,{nullable:true})
    async me(@Ctx() ctx:MyContext): Promise<User|undefined>{
        if(!ctx.req.session!.userId){
            return undefined
        }

        return User.findOne(ctx.req.session!.userId)
    }
}