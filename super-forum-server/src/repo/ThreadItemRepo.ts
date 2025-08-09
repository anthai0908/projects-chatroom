import { isThreadBodyValid } from "../common/validators/ThreadValidators";
import { QueryOneResult, QueryArrayResult } from "./QueryArrayResult";
import { ThreadItem } from "./ThreadItem";
import { User } from "./User";
import { Thread } from "./Thread";
import { AppDataSource } from "../data-source";

const threadItemRep = AppDataSource.getRepository(ThreadItem);
const threadRepo = AppDataSource.getRepository(Thread);
const userRepo = AppDataSource.getRepository(User);
export const createThreadItem = async(
    body: string,
    userId?: string ,
    threadId?: string, 
) : Promise<QueryOneResult<ThreadItem>> =>{
    const bodyMsg = isThreadBodyValid(body);
    if(bodyMsg){
        return {
            messages: [bodyMsg]
        }
    }
    if(!userId){
        return {
            messages: ["User not logged in"]
        };
    }
      const [user, thread] = await Promise.all([
    userRepo.findOne({ where: { id: userId } }),
    threadRepo.findOne({ where: { id: threadId } }),
  ]);
    if(!thread){
        return {
            messages: ["Thread not found"],
        };
    };
    const threadItem = await threadItemRep.create({
        body: body,
        user: user as User,
        thread: thread
    });
    await threadItemRep.save(threadItem);
    if(!threadItem){
        return {
            messages: ["Failed to create threadItem."],
        }
    }
    return {
        messages: [`${threadItem.id}`]
    };
   
}

 export const getThreadItemByThreadId = async(
        threadId: string,
    ) : Promise<QueryArrayResult<ThreadItem>>=>{
        const threadItems = await threadItemRep.createQueryBuilder("ti")
        .where(`ti."threadId" =:threadId`, {threadId})
        .leftJoinAndSelect("ti.thread", "thread")
        .orderBy("ti.createdOn", "DESC")
        .getMany();

        if(!threadItems){
            return {
                messages: ["ThreadItems or thread not found"],
            };
        }
        console.log(threadItems);
        return {
            entities: threadItems,
        };
    };