import {IResolvers} from "@graphql-tools/utils";
import { QueryArrayResult, QueryOneResult } from "../repo/QueryArrayResult";
import { createThread, getThreadById, getThreadsByCategoryId } from "../repo/ThreadRepo";
import { login, register, UserResult } from "../repo/UserRepo";
import { Thread } from "../repo/Thread";
import { updateThreadPoint } from "../repo/ThreadPointRepo";
import GqlContext from "./GqlContext";
import "express-session"

declare module "express-session"{
    interface SessionData{
        userid: string | undefined,
    }
}
interface EntityResult {
        messages: Array<string>,
    };
const resolvers : IResolvers = {
    ThreadResult: {
        __resolveType(obj: any){
            if(obj.messages){
                return "EntityResult";
            }
            else {
                return "Thread";
            }
        }
    },
    ThreadArrayResult: {
        __resolveType(obj: any){
            if(obj.messages){
                return "EntityResult";
            }
            else{
                return "ThreadArray";
            }
        }
    },
    Query: {
        getThreadById: async (
           _: any,
            args: {
                id: string,
            
            },

        ) : Promise<Thread | EntityResult> => {
            let thread: QueryOneResult<Thread>;
            try {
                thread = await getThreadById(args.id);
                if (thread.entity){
                    return thread.entity;
                }
                else {
                    return {
                        messages: [thread.messages? thread.messages[0] : "test"]
                    };
                }
            }
            catch (ex){
                throw ex;        
                }
        },
        getThreadsByCategoryId: async (
            _: any,
            args: {
                categoryId: string
            },
         ) : Promise<{threads: Array<Thread>}|EntityResult> => {
            let threads: QueryArrayResult<Thread>;
            try {
                threads = await getThreadsByCategoryId(
                    args.categoryId,
                );
                if(threads.entities){
                    return  {
                        threads : threads.entities
                    }
                }
                return {
                    messages: threads.messages? threads.messages : ["An error has occured "]
                }
            }
            catch(ex){
                throw ex;
            }
        }
    },
    Mutation: {
        register : async (
            _: any,
            args: {
                email: string,
                userName: string,
                password: string, 
            }
        ) : Promise<string>=> {
            try{
                const result = await register(
                    args.email,
                    args.userName,
                    args.password
                );
                if (result && result.user){
                    return "Registration successful";
                } else {
                    return result && result.messages? result.messages[0] : "An error has occured"
                }
            }
            catch(ex){
                throw ex;
            }    
        },

        login : async (
            _: any,
            args : {
                userName: string,
                password: string
            },
            context: GqlContext,
        ) : Promise<string> =>{
            let user: UserResult;
            try{
                user = await login(
                    args.userName,
                    args.password
                );
                if(user && user.user){
                    context.req.session.userid = user.user.id;
                    return `Login successful for userId ${context.req.session.userid}.`;
                }
                return user && user.messages? user.messages[0] : "An error has occurred";
            }
            catch(ex){
                throw ex;
            }
        },
        createThread: async (
            _: any,
            args: {
                userId: string,
                categoryId: string,
                title: string,
                body: string,
            }
        ) : Promise<EntityResult> => {
            let result : QueryOneResult<Thread>;
            try{
                result = await createThread(
                    args.userId,
                    args.categoryId,
                    args.title,
                    args.body,
                );
                return {
                    messages: result.messages? result.messages : ["An error has occurred"]
                }
            }
            catch(ex){
                throw ex;
            }
        },

        updateThreadPoint : async(
            _: any,
            args: {
                userId: string, 
                threadId: string, 
                increment: boolean
            },
            context : GqlContext,

        ) : Promise<string> =>{
            let result = "";
            try {
                if (!context.req.session || !context.req.session.userid){
                    console.log("Session userid is: ", context.req.sessionID)
                    return "You must be logged in to set likes"
                }
                result = await updateThreadPoint(
                    args.userId,
                    args.threadId,
                    args.increment
                );
                return result;
            }
            catch(ex){
                throw ex;
            }

        }
    }

}
export default resolvers;
