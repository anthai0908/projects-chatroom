import {IResolvers} from "@graphql-tools/utils";
import { QueryArrayResult, QueryOneResult } from "../repo/QueryArrayResult";
import { createThread, getThreadById, getThreadsByCategoryId, getThreadsLatest} from "../repo/ThreadRepo";
import { login, logout, me, register, UserResult } from "../repo/UserRepo";
import { Thread } from "../repo/Thread";
import { updateThreadPoint } from "../repo/ThreadPointRepo";
import { updateThreadItemPoint } from "../repo/ThreadItemPointRepo";
import GqlContext from "./GqlContext";
import "express-session"
import { User } from "../repo/User";
import { ThreadCategory } from "../repo/ThreadCategory";
import { getAllCategories } from "../repo/ThreadCategoryRepo";
import { changePassword } from "../repo/UserRepo";
import { ThreadItem } from "../repo/ThreadItem";
import { createThreadItem } from "../repo/ThreadItemRepo";
import CategoryThread from "../repo/CategoryThread";
import { getTopCategoryThread } from "../repo/CategoryThreadRepo";
const STANDARD_ERROR = "An error has occured";
declare module "express-session"{
    interface SessionData{
        userid: string | undefined,
    }
}
interface EntityResult {
        messages: Array<string>,
    };
const resolvers : IResolvers = {
    UserResult : {
        __resolveType(obj: any){
            if(obj.messages){
                return "EntityResult";
            }
            return "User";
        }
    },
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
                    return {
                        threads: threads.entities
                    } ;
                }
                return {
                    messages: threads.messages? threads.messages : ["An error has occured "]
                }
            }
            catch(ex){
                throw ex;
            }
        },

        getAllCategories: async(
            _: any,
        ) : Promise<Array<ThreadCategory>|EntityResult>=> {
            let result : QueryArrayResult<ThreadCategory>;
            try{
                result = await getAllCategories();
                console.log("categories is: ", result)
                if(result.entities){
                    return result.entities;
                }
                else{
                    return {
                        messages: result.messages? result.messages : [STANDARD_ERROR],
                    }
                }
           }
           catch(ex){
            throw ex;
           }
        },
       getThreadsLatest : async() : Promise<{threads: Array<Thread>} | EntityResult> => {
            let threads : QueryArrayResult<Thread>;
            try{
                threads = await getThreadsLatest();
                if(threads.entities){
                    return {
                        threads: threads.entities,
                    }
                }
                return {
                    messages: threads.messages? threads.messages : [STANDARD_ERROR],
                }
            }
            catch(ex){
                throw(ex);
            }    
       },
        me : async(
            _: any,
            __: any,
            context: GqlContext,
        ): Promise<User | EntityResult>=>{
            let user: UserResult;
            console.log("session is: ", context.req.session);
            try{
                if (!context.req.session?.userid){
                    return {
                        messages: ["User not logged in"],
                    };
                }
                user = await me(context.req.session?.userid);
                if(user && user.user){
                    return user.user;
                }
                return {
                    messages: user.messages? user.messages : ["An error has occured"]
                }    
            } 
            catch(ex){
                    throw(ex);
                }
        },
            getTopCategoryThread: async (
              _: any,
                    
            ): Promise<Array<CategoryThread>> => {
              try {
                return await getTopCategoryThread();
              } catch (ex) {
                throw ex;
              }
            },
            
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

        logout : async(
            _: any, 
            args : {
                userName: string
            },
            context: GqlContext,
        ) : Promise<string> => {
            try {
                let result = await logout(
                    args.userName,
                );
                context.req.session?.destroy((err: any) =>{
                    if(err){
                        console.log("destroy session failed");
                        return;
                    }
                    console.log("session destroyed", context.req.session?.userid)
                })
                return result;
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
        createThreadItem : async(
            _: any,
            args: {userId: string, threadId: string, body: string},
        ) : Promise<EntityResult> =>{
            let result : QueryOneResult<ThreadItem>;
            try{
                result = await createThreadItem(
                args.body, args.userId, args.threadId
                )
                return {
                    messages: result.messages? result.messages : ["An error has occurred"],
                }
                
            }
            catch (ex){
                    console.log(ex);
                    throw (ex);
                }
        },
        updateThreadItemPoint : async(
            _: any,
            args: {
                threadItemId: string,
                increment: boolean,
            },
            context: GqlContext,
        ) : Promise<String>=>{
            let result = "";
            try{
                if(!context.req.session || !context.req.session?.userid){
                    return "You must be logged in to set likes";
                }
                result = await updateThreadItemPoint(
                    context.req.session!.userid,
                    args.threadItemId,
                    args.increment
                );
                return result;
            }
            catch(ex){
                throw ex;
            }
        },
        updateThreadPoint : async(
            _: any,
            args: {
                threadId: string, 
                increment: boolean
            },
            context : GqlContext,

        ) : Promise<string> =>{
            let result = "";
            try {
                if (!context.req.session || !context.req.session.userid){
                    return "You must be logged in to set likes"
                }
                result = await updateThreadPoint(
                    context.req.session!.userid,
                    args.threadId,
                    args.increment
                );
                return result;
            }
            catch(ex){
                throw ex;
            }

        },
        changePassword: async(
            _: any,
            args: {newPassword: string},
            context: GqlContext,
        ) : Promise<string>=>{
            try{
                if(!context.req.session || !context.req.session!.userid){
                    return "You must sign in before you can change your password";
                };
                let result = await changePassword(context.req.session.userid, args.newPassword);
                return result;
            }
            catch(ex){
                throw ex;
            }
        }

    }

}
export default resolvers;
