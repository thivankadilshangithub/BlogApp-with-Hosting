import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const labelStyle = {mb:1 , mt:2 , fontSize: '24px' , fontWeight:'bold'}

const AddBlog = () => {

  const navigate = useNavigate();
  const [inputs , setInputs] = useState({
    title:"", description:"" , imageURL:""
  });

  const handleChange=(e)=>
  {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=> navigate("/blogs"));
  }

  const sendRequest = async()=>{
    const res = await axios.post("https://mern-blogapplication.herokuapp.com/api/blog/add" , {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: localStorage.getItem("userId")
    }).catch(err=>console.log(err));

    const data = await res.data;
    return data;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <Box border={3}  borderColor='linear-gradient(90deg, rgba(58,157,180,1) 2%, rgba(66,66,159,1) 35%, rgba(0,58,161,1) 73%, rgba(69,187,252,1) 100%);'
        borderRadius={10} boxShadow="10px 10px 20px #ccc" 
        padding={3} margin={"auto"} marginLeft={14} marginTop={1} display='flex' flexDirection={"column"} width={"80%"} >
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'} > Post Your Blog</Typography>
          <InputLabel sx={labelStyle} >Title</InputLabel>
          <TextField name='title' value={inputs.title} onChange={handleChange}  margin='normal' variant='outlined' />
          <InputLabel  sx={labelStyle} >Description</InputLabel>
          <TextField  name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined'/>
          <InputLabel  sx={labelStyle}  >ImageURL</InputLabel>
          <TextField  name='image' value={inputs.image} onChange={handleChange} margin='normal' variant='outlined'/> 
          <Button sx={{mt:2 ,borderRadius:4 }} variant="contained" color='warning' type='submit' >Submit</Button>
        </Box>
      </form>
    </div>
  )
}
//line 52 imageURL->image

export default AddBlog;
