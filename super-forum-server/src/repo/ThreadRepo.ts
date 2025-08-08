import { AppDataSource } from "../data-source";
import { QueryArrayResult, QueryOneResult } from "./QueryArrayResult";
import { User } from "./User";
import { Thread} from "./Thread";
import { ThreadCategory } from "./ThreadCategory";
import { isThreadTitleValid, isThreadBodyValid } from "../common/validators/ThreadValidators";

export const createThread = async (
    userid: string |null |undefined,
    categoryId: string,
    title: string,
    body: string
) : Promise<QueryOneResult<Thread>> =>{
    const titleMsg = isThreadTitleValid(title);
    if(titleMsg){
        return {
            messages: [titleMsg],
        };
    }

    const bodyMsg = isThreadBodyValid(body);
    if (bodyMsg){
        return {messages: [bodyMsg]}
    }

    if(!userid){
        return {
            messages:["User not logged in"],
        };
    };

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            id : userid,
        }
    });
    console.log(user)
    if (!user) {
        return { messages: ["User not found."] };
    }
    const categoryRepository = AppDataSource.getRepository(ThreadCategory);
    const category = await categoryRepository.findOne({
        where: {
            id: categoryId
        }
    });
    if(!category){
        return {
            messages: ["category not found"],        }
    }
    const threadRepository = AppDataSource.getRepository(Thread); 
   const thread = threadRepository.create({
    title,
    body,
    user,
    category: category
   })
   await threadRepository.save(thread)
    if (!thread){
        return {
            messages: ["Failed to create thread"]
        };
    }
    return {
        messages: [thread.id]
    }
}

export const getThreadById = async (
    id: string
): Promise<QueryOneResult<Thread>>=>{
    const threadRepository = AppDataSource.getRepository(Thread);
    const thread = await threadRepository.findOne({
        where: {
            id: id,
        }, 
        relations: ["user", "threadItems", "threadItems.user", "category" ]
    })
    if(!thread){
        return {
            messages: ["Thread not found"],
        }
    }

    return {
        entity: thread,
    }
}

export const getThreadsByCategoryId = async (
  categoryId: string
): Promise<QueryArrayResult<Thread>> => {
  try {
    const threads = await AppDataSource.getRepository(Thread)
                                       .createQueryBuilder("thread")
                                       .where(`thread."categoryId" = :categoryId`, {categoryId})
                                       .leftJoinAndSelect("thread.category", "category")
                                       .leftJoinAndSelect("thread.threadItems", "threadItems")
                                       .leftJoinAndSelect("thread.user", "user")
                                       .orderBy("thread.createdOn", "DESC")
                                       .getMany();
    if (!threads || threads.length === 0) {
      return {
        messages: ["No threads found for the given category"],
      };
    }
    console.log(threads);
    return {
      entities: threads,
    };
  } catch (error) {
    return {
      messages: [(error as Error).message],
    };
  }
};

export const  getThreadsLatest = async () : Promise<QueryArrayResult<Thread>> =>{
            const threadRepo = AppDataSource.getRepository(Thread);
            const threads = await threadRepo.createQueryBuilder("thread").leftJoinAndSelect("thread.category", "category")
                                                                         .leftJoinAndSelect("thread.threadItems", "threadItems")
                                                                         .leftJoinAndSelect("thread.user", "user")
                                                                         .orderBy("thread.createdOn", "DESC")
                                                                         .take(10)
                                                                         .getMany();
            if(!threads || threads.length === 0 ){
                return {
                    messages: ['No thread found.'],
                };
            }
            return {
                entities: threads,
            }
        };
    

