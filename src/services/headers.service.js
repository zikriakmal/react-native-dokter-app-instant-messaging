import { MMKV } from 'react-native-mmkv'

const headers= ()=>
{
  return {headers:{'Authorization': `Bearer ${MMKV.getString('access_token')}`} }
}

export default headers