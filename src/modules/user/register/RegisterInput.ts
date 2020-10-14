import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./emailAlreadyExists";
import { PasswordInput } from '../../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput{
    
    @Field()
    @Length(1,255)
    firstName : string;
    
    @Field()
    @Length(1,255)
    lastName : string;
    
    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({message:'Email is already used'})
    email : string;
}