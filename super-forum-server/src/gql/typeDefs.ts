import {gql} from"apollo-server-express";

const typeDefs = gql`
    scalar Date
    type EntityResult {
        messages: [String]
        }
    type User {
        id: ID!
        email: String!
        userName: String!
        password: String!
        confirmed: Boolean!
        isDisabled: Boolean!
        threads: [Thread!]
        threadItems: [ThreadItem!]
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
        }
    type Thread {
        id: ID!
        body: String!
        points: Int!
        views: Int!
        isDisabled: Boolean!
        title: String!
        user: User!
        threadItems: [ThreadItem!]
        category: ThreadCategory
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
        }
    type ThreadArray{
        threads: [Thread!]}
    union ThreadArrayResult = ThreadArray | EntityResult
    union ThreadResult = Thread | EntityResult
    union UserResult = User | EntityResult
    type ThreadItem {
        id: ID!
        points: Int!
        views: Int!
        isDisabled: Boolean!
        body: String!
        user: User!
        thread: Thread!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
        }
    type ThreadCategory {
        id: ID!
        name: String!
        description: String
        threads: [Thread!]!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date! 
        }
    type Query {
        getThreadById(id: ID!): ThreadResult
        getThreadsByCategoryId(categoryId: ID!): ThreadArrayResult
        getThreadsLatest: ThreadArrayResult!
        getAllCategories: [ThreadCategory!]
        me: UserResult!
        }
    
    type Mutation {
        createThread (
            userId: ID!
            categoryId: ID!
            title: String!
            body: String!) : EntityResult
        
        login(
            userName: String!,
            password: String!) : String!
        
        logout(
            userName: String!
        ) : String!
        register(
            email: String!
            userName: String!
            password: String!
        ) : String!
        updateThreadPoint( threadId: ID!,  increment: Boolean!) : String!
        updateThreadItemPoint( threadItemId: ID!, increment: Boolean!) : String!
        changePassword(newPassword: String!) : String!
        }

        
        
        
    `;
export default typeDefs;
