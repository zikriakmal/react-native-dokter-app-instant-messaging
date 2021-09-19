import headers from './headers.service';
import indexService from './index.service';

const GetFileList = async () =>
{
    let fileData = await indexService.get('file',headers()).catch((error)=>console.log(error))
    return fileData;
}

export {GetFileList}