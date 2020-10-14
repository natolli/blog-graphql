import { Mutation, Resolver,Arg } from "type-graphql";
import {User} from '../../entity/User'
import {v4} from 'uuid'
import {sendEmail} from '../utils/sendEmail'
import {redis} from '../../redis'
import { forgotPasswordPrefix } from '../constants/redisPrefixs';


@Resolver()
export class ForgotPasswordRsolver{

    @Mutation(()=>Boolean)
    async forgotPassword(
        @Arg('email') email:string
    ): Promise<boolean>{
        const user = await User.findOne({where:{email}})

        if(!user){
            return true
        }

        const token = v4()
        await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60*60*24)// 1 day exp

        await sendEmail(email, `http://localhost:3000/user/change-password/${token}`)

        
        
        return true
    }


}