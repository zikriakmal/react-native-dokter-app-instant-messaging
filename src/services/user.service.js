import indexService from './index.service';
import headers from './headers.service';

const GetInfo = async () =>
{
    let userData = await indexService.get('get-user-info', headers()).catch((error) => console.log(error))
    return userData;
}

const updateProfileInfo = async (datum) =>
{
    var data = new FormData();
    data.append('image',
      {
         uri:datum.filePath,
         name:'userProfile.jpg',
         type:'image/jpg'
      });
      data.append('username',datum.username);
      data.append('phone_number',datum.phoneNumber);
      data.append('password',datum.password);

    let updateProfile = await indexService.post('member/profile-update',
        data, 
        headers()).catch((error) => console.log(error));
    return updateProfile;
}

export { GetInfo, updateProfileInfo };