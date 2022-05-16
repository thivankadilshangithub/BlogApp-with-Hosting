import React from 'react';
import { useEffect , useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
const labelStyle = {mb:1 , mt:2 , fontSize: '24px' , fontWeight:'bold'}

const BlogDetail = () => {

  const navigate = useNavigate();
  const [blog , setBlog] = useState();
  const id = useParams().id;
  console.log(id);

  const [inputs , setInputs] = useState({
  
  });

  const handleChange=(e)=>
  {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  }

  const fetchDetails = async()=> {
    const res = await axios.get(`https://mern-blogapplication.herokuapp.com/api/blog/${id}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }

  const handleSubmit= (e) =>{
    e.preventDefault()
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=>navigate("/myBlogs"));
  }


  useEffect(()=>{
    fetchDetails().then(data=>{
      setBlog(data.blog)
      setInputs({title:data.blog.title,
      description:data.blog.description
      // imageURL:data.blog.image
    })
    });
  },[id]);

  const sendRequest = async()=>{
    const res = await axios.put(`https://mern-blogapplication.herokuapp.com/api/blog/update/${id}` , {
      title:inputs.title,
      description:inputs.description
      
    }).catch(err => console.log(err));

    const data = await res.data;
    return data;
  }

  console.log(blog);
  return (
    <div>

      {inputs && 

       <form onSubmit={handleSubmit} >
        <Box border={3}  borderColor='linear-gradient(90deg, rgba(58,157,180,1) 2%, rgba(66,66,159,1) 35%, rgba(0,58,161,1) 73%, rgba(69,187,252,1) 100%);'
        borderRadius={10} boxShadow="10px 10px 20px #ccc" 
        padding={3} margin={"auto"} marginLeft={14} marginTop={7} display='flex' flexDirection={"column"} width={"80%"} >
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'} > Update Your Blog</Typography>
          <InputLabel sx={labelStyle} >Title</InputLabel>
          <TextField name='title' value={inputs.title} onChange={handleChange}  margin='normal' variant='outlined' />
          <InputLabel  sx={labelStyle} >Description</InputLabel>
          <TextField  name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined'/>
          <Button sx={{mt:2 ,borderRadius:4 }} variant="contained" color='warning' type='submit' >Submit</Button>
        </Box>
      </form>
}
    </div>
  )
}

export default BlogDetail;
