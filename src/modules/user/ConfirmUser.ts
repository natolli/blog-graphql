import {Arg,Mutation, Resolver} from 'type-graphql'
import { User } from  '../../entity/User';
import {redis} from '../../redis'
import { confirmantionPrefix } from  '../constants/redisPrefixs';

@Resolver()
export class ConfirmUserResolver{

    @Mutation(()=> Boolean)
    async confirmUser(
        @Arg('token') token:string
     ): Promise<boolean>{
        const userId = await redis.get(confirmantionPrefix + token)

        if(!userId){
            return false
        }

        User.update({id: parseInt(userId,10)}, {confirmed: true})
        await redis.del(token)

        return true

    }
}