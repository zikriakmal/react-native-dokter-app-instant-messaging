import indexService from './index.service';

const Auth = async (email,password) =>
{
    let userData = await indexService.post('auth/login',
        {
            email: email,
            password:password 
        }).catch((error)=>console.log(error))
    return userData;
}

const Register = async (username,phoneNumber,email,password) =>
{
    let userData = await indexService.post('auth/register',
        {
            username:username,
            phone_number:phoneNumber,
            email: email,
            password:password 
        }).catch((error)=>console.log(error))
    return userData;
}


export {Auth,Register};