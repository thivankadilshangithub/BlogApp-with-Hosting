import React from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=> state.isLoggedIn);
    const [value, setvalue] = useState();
    return (
        <AppBar
        position='sticky'
        sx={{ background:'linear-gradient(90deg, rgba(58,157,180,1) 2%, rgba(66,66,159,1) 35%, rgba(0,58,161,1) 73%, rgba(69,187,252,1) 100%);' }} >
            <Toolbar>
                <NavLink style={{color:"white",textDecoration:"none"}} to="/">
                <Typography variant='h4' style={{fontFamily:"'Macondo', cursive"}} >WIX BLOG</Typography>
                </NavLink>
               { isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'} >
                    <Tabs textColor="inherite" value={value} onChange={(e , val)=>setvalue(val)} >
                        <Tab  LinkComponent={Link} to="/blogs" label="All Blogs" />
                        <Tab  LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                        <Tab  LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
                    </Tabs>
                </Box> }
                <Box display="flex" marginLeft="auto" >
                 { !isLoggedIn &&  <Button  LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1 , borderRadius: 10 }} color='warning'>Login</Button> }
                 { !isLoggedIn &&  <Button  LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1 , borderRadius: 10 }} color='warning'>SignUp</Button> }
                   { isLoggedIn && <Button  onClick={()=>dispatch(authActions.logout())}  LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1 , borderRadius: 10 }} color='warning'>Logout</Button>}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
