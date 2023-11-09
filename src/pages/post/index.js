import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
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
export const Posts = () => {
  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state)
  useEffect(() => {
    dispatch(getAllPosts());
  }, [])

  console.log({
    reduxStore
  })

  /**
  
  {
    "_id": "654bba613f0bd9bc5e232f37",
    "title": "My New Post",
    "description": "This is a test post",
    "imageLink": "https://example.com/image.jpg",
    "user": {
        "_id": "654b8cb843009ea1fc1ee251",
        "email": "ohri.piyush0190@gmail.com"
    },
    "createdAt": "2023-11-08T16:42:09.015Z",
    "updatedAt": "2023-11-08T16:42:09.015Z",
    "__v": 0
  }


   */
  return (
    <h1>
      Loading Posts
      
      {
        reduxStore.post.posts.map((post) => {
          const {user} = post
          return (
            <>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src="https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/l-intro-1663193400.jpg">
                    {/* <FaceIcon color={"error"}/> */}

                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                    <Typography variant="body1" color={"black"} fontWeight={600}>
                      {user.email}
                    </Typography>
                } secondary={
                  <Typography variant='subtitle2' color={"gray"} fontWeight={400}>
                    {formatedPeriodForDisplay(post.createdAt)}
                  </Typography>
                } />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={
                    <Typography variant="h6" color={"black"} fontWeight={600}>
                      {post.title}
                    </Typography>
                } secondary={
                  <Typography  variant="body1">
                      {post.description}
                  </Typography>
                } />
              </ListItem>
            </>
          )
        })
      }
    </h1>
  )
}
