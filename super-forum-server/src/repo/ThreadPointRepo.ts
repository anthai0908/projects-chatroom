import { AppDataSource } from "../data-source";
import { Thread } from "./Thread";
import { ThreadPoint } from "./ThreadPoint";
import { User } from "./User";

export const updateThreadPoint = async (
    userId: string,
    threadId: string,
    increment: boolean,
) : Promise<string> => {
    let message = "Failed to increment thread point";
    const threadRepo = AppDataSource.getRepository(Thread);
    const thread = await threadRepo.findOne({
        where: {
            id: threadId,
        },
        relations: ["user"]
    });
    if (!thread){
        return "Thread not found";
    }
    if (thread!.user!.id === userId){
        message = "Error: users cannot increment their own thread";
        console.log("incThreadPoints ", message);
        return message;
    }
    const user = await AppDataSource.getRepository(User).findOne({where: {id: userId}});
    if(!user){
        return "User not found";
    }
    const existingPoint = await AppDataSource.getRepository(ThreadPoint).findOne({
        where: {
            thread: {id: threadId},
            user: {id: userId}
        },
        relations: ["thread"]
    });
    await AppDataSource.manager.transaction(async (transactionEntityManager) => {
        if (existingPoint){
            if(increment){
                if(existingPoint.isDecrement){
                    await transactionEntityManager.remove(existingPoint);
                    thread!.points = Number(thread!.points) + 1;
                    thread!.lastModifiedOn = new Date();
                    await transactionEntityManager.save(thread);
                }
            }
            else{
                if(!existingPoint.isDecrement){
                    await transactionEntityManager.remove(existingPoint);
                    thread!.points = Number(thread!.points) -1;
                    thread!.lastModifiedOn = new Date();
                    await transactionEntityManager.save(thread);
                }
            }
        }
        else {
            const newThreadPoint = await transactionEntityManager.create(ThreadPoint, {
                thread,
                user,
                isDecrement: !increment
            });
            await transactionEntityManager.save(newThreadPoint);
        
            thread.points = Number(thread.points) + (increment ? 1 : -1);
            thread.lastModifiedOn = new Date();
            await transactionEntityManager.save(thread);
        }
        message = `Successfully ${increment? "incremented" : "decremented"} point.`;
    } );
    return message;
}