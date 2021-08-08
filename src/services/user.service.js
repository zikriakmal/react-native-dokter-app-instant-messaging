import indexService from './index.service';
import headers from './headers.service';

const GetInfo = async () =>
{
    let userData = await indexService.get('get-user-info', headers()).catch((error)=>console.log(error))
    return userData;
}

export {GetInfo};