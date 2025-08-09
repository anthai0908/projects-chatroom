import Category from "../models/Category";
import CategoryThread from "../models/CategoryThread";
import Thread from "../models/Thread";
import User from "../models/User";
const user = new User ("1", "test1@test.com", "test1")
export async function getCategories() : Promise<Array<Category>>{
    const promise = new Promise <Array<Category>>((res, rej)=>{
        setTimeout(()=>{
            const categories = [];
            const programming = new Category("1", "Programming");
            const cooking = new Category("2", "Cooking");
            const sports = new Category("3", "Sports");
            const entertainment = new Category("4", "Entertainment");
            const travel = new Category("5", "Travel");
            categories.push(programming);
            categories.push(cooking);
            categories.push(sports);
            categories.push(entertainment);
            categories.push(travel);
            res(categories);
        }, 2000);
    });
    return promise;
}


export async function getTopCategories(): Promise<Array<CategoryThread>>{
    const promise = new Promise<Array<CategoryThread>> ((res, rej)=>{
        setTimeout(()=>{
            const TopCategories : Array<CategoryThread> = [];
            const js = new CategoryThread(
                "1",
                "Programming",
                "How can I learn Javascript");
            TopCategories.push(js);
            const node = new CategoryThread(
                "2",
                "Programming",
                "How can I learn Node"
            );
            TopCategories.push(node);
            const react = new CategoryThread(
                "3",
                "Programming",
                "How can I learn React",
            );
            TopCategories.push(react);
            const french = new CategoryThread(
                "4",
                "Cooking",
                "How do I learn French cuisine"
            );
            TopCategories.push(french);
            const italian = new CategoryThread(
                "5",
                "Cooking",
                "How do I learn Italian cuisine"
            );
            TopCategories.push(italian);
            const soccer = new CategoryThread(
                "6",
                "Sports",
                "How can I learn to play soccer"
            );
            TopCategories.push(soccer);
            const basketball = new CategoryThread(
                "7",
                "Sports",
                "How can I learn to play basketball"
            );
            TopCategories.push(basketball);
            const baseball = new CategoryThread(
                "8",
                "Sports",
                "How can I learn to play baseball"
            );
            TopCategories.push(baseball);
            res(TopCategories);
        },2000)
    });
    return promise;
}
