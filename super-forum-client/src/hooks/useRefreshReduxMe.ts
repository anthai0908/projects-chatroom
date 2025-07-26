import {gql, LazyQueryExecFunction,LazyQueryHookExecOptions,OperationVariables,useLazyQuery} from "@apollo/client";
import { UserProfileSetType } from "../store/user/Reducer";
import { useDispatch } from "react-redux";

export const Me = gql  `
    query me{
        me{
            ... on EntityResult{
                messages
            }
            ... on User {
                id
                email
                userName
                threads {
                    id 
                    title
                }
                threadItems {
                    id
                    thread{
                        id
                    }
                    body
                }
            }
        }
    }
`
interface UseRefreshReduxMeResult {
    execMe: (options? : Partial<LazyQueryHookExecOptions<any, any>>)=> void;
    deleteMe: ()=> void;
    updateMe: ()=> void;

}
const UseRefreshReduxMe = () : UseRefreshReduxMeResult =>{
    const [execMe, {data}] = useLazyQuery(Me);
    const reduxDispatcher = useDispatch();

    const deleteMe = ()=>{  
        reduxDispatcher({
            type: UserProfileSetType,
            payload: null
        });
    };
    const updateMe = ()=>{
        if(data && data.me && data.me.userName){
            reduxDispatcher({
                type: UserProfileSetType,
                payload: data.me
            })
        }
    };
    return {execMe, deleteMe, updateMe};
};
export default UseRefreshReduxMe;