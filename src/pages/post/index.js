import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllPosts } from '../../store/actions/postActions';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider
} from "@mui/material"
import FaceIcon from '@mui/icons-material/Face';
import { formatedPeriodForDisplay } from '../../utils/helpers';
import CommentSection from './commentSection';
export const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStore = useSelector((state) => state)
  useEffect(() => {
    dispatch(getAllPosts());
  }, [])

  useEffect(() => {
    // Todo : this has to be written in more better way 
    if(reduxStore.post?.error?.status === 403) {
      if(localStorage) {
        localStorage.removeItem("jwtToken")
      }
      navigate("/login")
    }
  }, [reduxStore.post.error])

  console.log({
    reduxStore
  })
  
  return (
    <>
    <ListItem>
      <ListItemAvatar>
        <Avatar src="https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/l-intro-1663193400.jpg"/>
      </ListItemAvatar>
      <ListItemText primary={
          <Typography variant="body1" color={"black"} fontWeight={600}>
            {reduxStore.post.posts[0]?.user.email}
          </Typography>
      } secondary={
        <Typography variant='subtitle2' color={"gray"} fontWeight={400}>
          {formatedPeriodForDisplay(reduxStore.post.posts[0]?.createdAt)}
        </Typography>
      } />
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText primary={
          <Typography variant="h6" color={"black"} fontWeight={600}>
            {reduxStore.post.posts[0]?.title}
          </Typography>
      } secondary={
        <Typography  variant="body1">
            {reduxStore.post.posts[0]?.description}
        </Typography>
      } />
    </ListItem>
    <CommentSection postId={reduxStore.post.posts[0]?._id}/>
    </>
  )
}
