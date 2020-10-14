import {Arg, Ctx, Mutation, Resolver} from 'type-graphql'
import { User } from  '../../entity/User';
import bcrypt from 'bcryptjs';
import {LoginInput} from './login/LoginInput'
import {MyContext} from '../../types/MyContext'

@Resolver()
export class LoginResolver{

    @Mutation(()=> User,{nullable:true})
    async login(
        @Arg('input') {email,password}:LoginInput,
        @Ctx() ctx:MyContext   
     ): Promise<User | null>{
            
        const user = await User.findOne({where:{email}})

        if(!user){
            return null
        }

        const valid = bcrypt.compare(password, user.password)

        
        if(!valid){
            return null
        }

        if(!user.confirmed){
            throw new Error('User must confirm email')
        }

        ctx.req.session!.userId =  user.id
        

        return user;
    }
}