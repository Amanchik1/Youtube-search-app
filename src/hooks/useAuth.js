import users from '../data.json'

export const useAuth = () => (data) => {
    let userNames = users?.filter((item)=> item.userName === data.username)
    let user = userNames.filter((item) => item.password === data.password)
    if(user.length) {
        return user
    }
    return false
}