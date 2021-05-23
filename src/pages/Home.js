import React from 'react';
import { useSelector } from 'react-redux';



function Home(){

 const user = useSelector(state=>state.user.user);
 console.log(user)
    return (
        <div>
            Hello
        </div>
    )
}

export default Home;