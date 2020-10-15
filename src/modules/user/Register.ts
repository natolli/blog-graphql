import {Arg, Mutation, Resolver, Query, Ctx, UseMiddleware} from 'type-graphql'
import { User } from  '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import bcrypt from 'bcryptjs';
import {sendEmail} from '../utils/sendEmail'
import {createConfirmationUrl} from '../utils/createConfirmationURL'
import { MyContext } from  '../../types/MyContext';
import { isAuth } from  '../middleware/isAuth';
@Resolver()
export class RegisterResolver{

    @UseMiddleware(isAuth)
    @Query(()=>String)
    async hello(
        @Ctx() ctx: MyContext
    ): Promise<string>{

        const user = await User.findOne(ctx.req.session!.userId)
        

        return `Hello, ${user!.firstName}`
    }
    
    @Mutation(()=> User)
    async register(
        @Arg('data') {firstName, lastName, email, password}:RegisterInput    ): Promise<User>{
            
            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await User.create({
                firstName, lastName, email, password:hashedPassword
            }).save()

            await sendEmail(email, await createConfirmationUrl(user.id))

            return user;
    }
}