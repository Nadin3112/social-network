let initialState = {
    friends: [
        { id: 1, src: "https://img.freepik.com/premium-vector/vector-illustration-winter-girl-concept-brunette-girl-winter_469123-531.jpg", alt: 'Nadia' },
        { id: 2, src: 'https://img.freepik.com/premium-vector/vector-illustration-winter-boy-concept-hello-winter-avataka-social-networks_469123-525.jpg?w=2000', alt: 'Roma' },
        { id: 3, src: 'https://img.freepik.com/premium-vector/vector-illustration-winter-boy-concept-hello-winter-avataka-social-networks_469123-519.jpg', alt: 'Maksim' }
    ]
}

const sidebarReducer = (state = initialState, action) => {
    return state;
}

export default sidebarReducer;