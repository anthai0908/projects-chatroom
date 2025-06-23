import { AppDataSource } from "../data-source";
import { ThreadItem } from "./ThreadItem";
import { ThreadItemPoint } from "./ThreadItemPoint";
import { User } from "./User";

export const updateThreadItemPoint = async(
    userId: string,
    threadItemId: string,
    increment: boolean,
) : Promise<string> => {
    let message = "Failed to increment thread point";
    const threadItemRepo = AppDataSource.getRepository(ThreadItem);
    const threadItem = await threadItemRepo.findOne({
        where: {
            id: threadItemId,
        },
        relations : ["user"]
    });
    if(!threadItem){
        return "Thread itea not found";
    }
    if(threadItem!.user!.id === userId){
        return "Error, user can not increment their own thread item";
    }
    const user = await AppDataSource.getRepository(User).findOne({
        where : {
            id: userId,
        }
    })

    if (!user){
        return "User not found";
    }
    const existingThreadItemPoint = await AppDataSource.getRepository(ThreadItemPoint).findOne({
        where : {
            user: {id: userId},
            threadItem: {id: threadItemId},
        },
        relations : ["threadItem"]
    })
    await AppDataSource.manager.transaction(async(transactionEntityManager) => {
        if (existingThreadItemPoint){
            if (increment){
                if(existingThreadItemPoint.isDecrement){
                    await transactionEntityManager.remove(existingThreadItemPoint);
                    threadItem!.points = Number(threadItem!.points) +1;
                    threadItem!.lastModifiedOn = new Date();
                    await transactionEntityManager.save(threadItem);
                }
            }
            else{
                if(!existingThreadItemPoint.isDecrement){
                    await transactionEntityManager.remove(existingThreadItemPoint);
                    threadItem!.points = Number(threadItem!.points) -1;
                    threadItem!.lastModifiedOn = new Date();
                    await transactionEntityManager.save(threadItem);

                }
            }
        }
        else{
            const newThreadItemPoint =await transactionEntityManager.create(ThreadItemPoint,{
                user,
                threadItem,
                isDecrement: !increment
            })
            await transactionEntityManager.save(newThreadItemPoint);
            threadItem.points = Number(threadItem.points) + (increment? 1 : -1);
            threadItem.lastModifiedOn = new Date();
            await transactionEntityManager.save(threadItem);
        }
        message = `Successfully ${increment? "incremented" : "decremented"} point.`;
    })
    return message;
}