
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} email
 * @property {string} password
*/

/**
 * @type {User[]}
*/
const userData = [
    {
        "id": 1,
        "email": "tetstingemail@mail.coms",
        "password": "tetstingemail"
    },
    {
        "id": 2,
        "email": "admin@mail.com",
        "password": "admin#123"
    },
    {
        "id": 3,
        "email": "ahahaha@mail.coms",
        "password": "password kuat"
    },
    {
        "id": 4,
        "email": "pengguna@mail.coms",
        "password": "********"
    },
    {
        "id": 5,
        "email": "asiterik@yahoo.com",
        "password": "washingtondc"
    },
    {
        "id": 6,
        "email": "user@mail.coms",
        "password": "user55#A"
    },
    {
        "id": 7,
        "email": "johndoe@mail.com",
        "password": "johndoe#123"
    },
    {
        "id": 8,
        "email": "janedoe@mail.com",
        "password": "janedoe#111"
    },
    {
        "id": 9,
        "email": "test@mail.com",
        "password": "euy123#456"
    },
    {
        "id": 10,
        "email": "tenusers@mail.com",
        "password": "strongpw#123"
    },
]

let incrementasId = userData.length + 1


function findUserIndex(id) {
    return userData.findIndex(user => user.id === id)
}

export async function getAllUsers() {
    return userData
}

export async function getUserById(id) {
    const found = userData.filter(user => user.id === id)
    if (found.length === 1) {
        return found[0]
    } else {
        throw new Error("User not found")
    }
}

/**
 * 
 * @param {User} data
*/
export async function createUser(data) {
    const id = incrementasId++
    userData.push({
        id,
        ...data
    })
    return data
}
/**
 * 
 * @param {number} id
 * @param {User} data
*/
export async function updateUser(id, data) {
    const index = findUserIndex(id)
    if (index !== -1) {
        userData[index] = { ...userData[index], ...data, id }
        return userData[index]
    } else {
        throw new Error("User not found")
    }
}

export async function deleteUser(id) {
    const found = findUserIndex(id)
    const user = userData[found]
    if (found !== -1) {
        userData.splice(found, 1)
        return user
    } else {
        throw new Error("User not found")
    }
}