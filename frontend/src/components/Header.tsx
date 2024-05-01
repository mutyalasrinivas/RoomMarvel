import {Link} from 'react-router-dom';

const Header =()=>{
return(
    <div className='bg-teal-500 py-7'>
         <div className='container mx-auto flex justify-between '>
            <span className='text-3xl text-yellow-400 font-bold tracking-tight'>
            <Link to="/">RoomBook </Link></span>
            <span className='flex space-x-2'>
            <Link to="/signin" className='flex items-center font-bold text-yellow-400 px-4 hover:bg-red-400' >Sign In </Link></span>  
        </div>
    </div>
)
}
export default Header;