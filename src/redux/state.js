let state = {
    profilePage: {

        posts: [
            { id: 1, message: 'Hi, how are you', likeCount: 25 },
            { id: 2, message: 'It is my first post', likeCount: 35 }
        ]

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
        ]
    },

    siteBar: {

        friends: [
            { id: 1, src: "https://img.freepik.com/premium-vector/vector-illustration-winter-girl-concept-brunette-girl-winter_469123-531.jpg", alt: 'Nadia' },
            { id: 2, src: 'https://img.freepik.com/premium-vector/vector-illustration-winter-boy-concept-hello-winter-avataka-social-networks_469123-525.jpg?w=2000', alt: 'Roma'},
            { id: 3, src: 'https://img.freepik.com/premium-vector/vector-illustration-winter-boy-concept-hello-winter-avataka-social-networks_469123-519.jpg', alt: 'Maksim'}
        ]
        
    },

}

export default state;