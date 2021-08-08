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


export default Auth;