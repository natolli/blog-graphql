import {Arg, Mutation, Resolver, Query} from 'type-graphql'
import { User } from  '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import bcrypt from 'bcryptjs';
import {sendEmail} from '../utils/sendEmail'
import {createConfirmationUrl} from '../utils/createConfirmationURL'
@Resolver()
export class RegisterResolver{

    @Query(()=>String)
    hello(): string{
        return 'Hello'
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