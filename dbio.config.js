module.exports = {
    apiAddress: 'https://dbio.me/api/v1',
    authRequired: [ "/[id]/edit", "/submit" ],
    titles: {
        '/': {
            title: 'Home',
            description: 'Start introducing yourself to the world.'
        },
        '/team': {
            title: 'Team',
            description: 'Meet the team behind Discord Bio.'
        },
        '/explore': {
            title: 'Explore',
            description: 'Find new peoples for your team.'
        },
        '/submit': {
            title: 'Submit',
            description: 'Submit your Profile to the Discord Bio.'
        },
        '/[id]': {
            title: '[id] - View Profile',
            description: 'Start introducing yourself to the world.'
        },
        '/[id]/edit': {
            title: 'Edit Profile',
            description: 'Start introducing yourself to the world.'
        }
    }
}