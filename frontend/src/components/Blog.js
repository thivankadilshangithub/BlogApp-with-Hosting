import React from 'react';
import { Avatar, CardContent, CardMedia, Typography, CardHeader, Card, Box, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const Blog = ({ title, description, imageURL, userName, isUser ,id }) => {

    const navigate = useNavigate();

    const handleEdit=(e)=>{
        navigate(`/myBlogs/${id}`);
    }

    const deleterequest = async()=>{
      const res = await axios.delete(`https://mern-blogapplication.herokuapp.com/api/blog/${id}`)
      .catch(err=> console.log(err)); 
       const data = await res.data;
       return data
    }
    const handleDelete=(e)=>{
        deleterequest().then(()=> navigate("/")).then(()=>navigate("/blogs"));
    }

    console.log(title, isUser)
    return (
        <div>
            <Card sx={{
                width: "45%", margin: 'auto', mt: 4, padding: 3,
                boxShadow: "5px 5px 10px #ccc", ":hover:": {
                    boxShadow: "50px 50px 20px #ccc"
                }
            }}>

                {isUser && (
                    <Box display='flex'>
                        <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }} >
                            <ModeEditOutlineIcon  color='warning' />
                        </IconButton>
                        <IconButton onClick={handleDelete}> 
                            <DeleteForeverIcon  color='error' /> 
                        </IconButton>
                    </Box>
                )}

                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                            {userName.charAt(0)}
                        </Avatar>
                    }

                    title={title}
                    subheader={userName}

                />
                <CardMedia
                    component="img"
                    height="220"
                    image={imageURL}
                    alt="Paella dish"
                />
             
                <CardContent>
                <hr/>
                <br />
                    <Typography variant="body2" color="text.secondary">
                        <b>{userName}</b> {":"} {description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Blog
