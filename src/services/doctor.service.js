import headers from './headers.service';
import indexService from './index.service';

const GetDoctorList = async () =>
{
    let userData = await indexService.get('doctor-list',headers()).catch((error)=>console.log(error))
    return userData;
}

export {GetDoctorList};