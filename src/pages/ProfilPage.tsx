import { EditUserInfo } from '../components/EditUserInfo';
import { EditEmail } from '../components/EditEmail';

export const ProfilPage = () => {

    return (
        <div className='h-full w-full border-l border-l-gray-200'>
            <EditUserInfo />
            <EditEmail />
        </div>
    )
}