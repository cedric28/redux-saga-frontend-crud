import { httpClient } from "./api"

const fetchUsersService = async () => {
    let payload = await httpClient({
        url: '/users',
        method: 'GET'
    });
    
    return payload.data.data;
}

const createUserService = async data => {
    let payload = await httpClient({
        url: '/users',
        method: 'POST',
        headers:{
            "content-type": "application/json",
            "Accept": "application/json"
        },
        data
    });
    
    return payload.message;
}

const updateUserService = async (id,data) => {
    let payload = await httpClient({
        url: `/users/${id}`,
        method: 'PUT',
        headers:{
            "content-type": "application/json",
            "Accept": "application/json"
        },
        data
    });
    
    return payload.message;
}

const deleteUserService = async id => {
    await httpClient({
        url: `/users/${id}`,
        method: 'DELETE'
    });

    return id;
}

const showUserService = async id => {
    const payload = await httpClient({
        url: `/users/${id}`,
        method: 'GET'
    });

    return payload.data.data;
}

export { fetchUsersService, deleteUserService, showUserService, createUserService ,updateUserService };