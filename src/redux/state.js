const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you', likeCount: 25 },
                { id: 2, message: 'It is my first post', likeCount: 35 }
            ],
            newPostText: 'it-incubator'
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Nadia' },
                { id: 2, name: 'Roma' },
                { id: 3, name: 'Anna' },
                { id: 4, name: 'Sofia' },
                { id: 5, name: 'Maksim' },
                { id: 6, name: 'Sveta' }
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'Hello' },
                { id: 3, message: 'How are you?' },
                { id: 4, message: 'Well. And you?' },
                { id: 5, message: 'I am ok' }
            ],
            newMessageText: ''
        },
        siteBar: {
            friends: [
                { id: 1, src: "https://img.freepik.com/premium-vector/vector-illustration-winter-girl-concept-brunette-girl-winter_469123-531.jpg", alt: 'Nadia' },
                { id: 2, src: 'https://img.freepik.com/premium-vector/vector-illustration-winter-boy-concept-hello-winter-avataka-social-networks_469123-525.jpg?w=2000', alt: 'Roma' },
                { id: 3, src: 'https://img.freepik.com/premium-vector/vector-illustration-winter-boy-concept-hello-winter-avataka-social-networks_469123-519.jpg', alt: 'Maksim' }
            ]
        },
    },

    getState() {
        return this._state;
    },

    _callSubscriber() {
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likeCount: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.newMessage;
            this._callSubscriber(this._state);
        } else if (action.type === SEND_MESSAGE) {
            let newMessage = this._state.dialogsPage.newMessageText;
            this._state.dialogsPage.messages.push({id: 6, message: newMessage});
            this._state.dialogsPage.newMessageText = '';
            this._callSubscriber(this._state);
        }
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })

export const updateNewPostTextActionCreator = (text) => 
    ({type: UPDATE_NEW_POST_TEXT, newText: text})

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessageTextActionCreator = (message) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessage: message})


export default store;

