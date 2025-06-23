import {User} from "./User";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "../common/validators/PassWordValidator";
import { isEmailValid } from "../common/validators/EmailValidator";
import { AppDataSource } from "../data-source";
const saltRounds = 10;

export class UserResult {
    constructor(public messages?: Array<string>, public user?: User){}
}

export const register = async (
    email: string,
    username: string,
    password: string
) : Promise<UserResult>  => {


    const result = isPasswordValid(password);
    if (!result.isvalid){
        return {
            messages: [
                "Password must have min length 8, 1 upper character, 1 number, and 1 symbol",
            ] 
        }
    }
    const trimmedEmail = email.trim().toLowerCase();
    const emailErrorMsg = isEmailValid(trimmedEmail);
    if(emailErrorMsg){
        return {
            messages: [emailErrorMsg],
        };
    }
    const salt = await bcrypt.genSalt(saltRounds); 
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRepository = AppDataSource.getRepository(User);
    const userEntity = userRepository.create({
        userName: username,
        email: trimmedEmail,
        password: hashedPassword
    })
    await userRepository.save(userEntity);
    userEntity.password = "";
    return {
        user: userEntity
    }
    }

export const login = async (
    userName: string,
    password: string,
) : Promise<UserResult> => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where: {userName}
    });
    if (!user){
        return {
            messages: [userNotFound(userName)],
        };
    }
    if(!user.confirmed){
        return {
            messages: ["User has not confirmed their registration email yet."],
        };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        return {
            messages: ["Password is invalid"],
        }
    }
    return{
        user: user
    }
}
const userNotFound = (userName: string) => {
    return `User with username ${userName} not found.`
}

export const logout = async (userName: string) : Promise<string> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.findOne({
        where: {userName},
    })

    if(!user){
        return userNotFound(userName);
    }
    return "User logged out";
}