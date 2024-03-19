import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you', likeCount: 25 },
        { id: 2, message: 'It is my first post', likeCount: 35 }
    ]
}

test('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator("it-kamasutra");
    
    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
});

test('message of posts should be correct', () => {
    // 1. test data
    let action = addPostActionCreator("it-kamasutra");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[2].message).toBe("it-kamasutra");
});

test('after deleting length of messages should be decrement', () => {
    //f 1. test data
    let action = deletePost(1);
    
    // 2. action
    let newState = profileReducer(state, action);
     // 3. expectation
    expect(newState.posts.length).toBe(2);
});

test('after deleting length should not be decrement if id is incorrect', () => {
    //f 1. test data
    let action = deletePost(1000);
    
    // 2. action
    let newState = profileReducer(state, action);
     // 3. expectation
    expect(newState.posts.length).toBe(2);
});