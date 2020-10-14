import { Mutation, Resolver,Arg, Ctx } from "type-graphql";
import {User} from '../../entity/User'
import {redis} from '../../redis'
import { forgotPasswordPrefix } from '../constants/redisPrefixs';
import {ChangePasswordInput} from './changePassword/ChangePasswordInputType'
import { MyContext } from '../../types/MyContext';
import bcrypt from 'bcryptjs'

@Resolver()
export class ChangePasswordRsolver{

    @Mutation(()=>User,{nullable:true})
    async changePassword(
        @Arg('data') {token,password}:ChangePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<User| null>{
        const userId = await redis.get(forgotPasswordPrefix+token)

        if(!userId){
            return null
        }
        
        const user =await User.findOne(userId)
        
        if(!user){
            return null
        }
        
        await redis.del(forgotPasswordPrefix+token)

        user.password = await bcrypt.hash(password, 12)
        await user.save()

        ctx.req.session!.userId = user.id

        return user
    }


}