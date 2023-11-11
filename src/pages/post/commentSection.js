import { Avatar, Box, Button, Divider, Grid, Paper, Skeleton, TextareaAutosize, Typography } from '@mui/material'
import {makeStyles} from "@mui/styles"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createComment, fetchComments } from '../../store/actions/commentActions';
import { getTokenFromLocalStorage } from '../../utils/helpers';

const SingleCommentDisplay = () => {

}

const useStyles = makeStyles((theme) => ({
  textarea: {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    borderColor: "black",
    borderStyle: 'solid',
    maxWidth: "60%"
  },
  commentContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: "4px",
    fontSize: "14px !important",
    marginLeft: 30
  },
  avatar: {
    marginRight: "4px",
    height: "29px",
    width: "29px",
    marginTop: "0px !important"
  },
  userContainer: {
    backgroundColor: '#EDF5F8',
    padding: "10px 12px 10px 12px",
    borderRadius: "0px 16px 16px 16px",
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: "2px",
  },
  replyButton: {
    marginTop: "2px",
    fontSize: "14px !important",
    fontWeight: 500,
    textTransform: "none",
    marginLeft: "10px"
  },
}));

export default function CommentSection({
  postId
}) {

  const dispatch = useDispatch();
  const commentState = useSelector((state) => state.comment)
  const [comment, setComment] = useState("")

  const handleCommentChange = (e) => {
    e.preventDefault(); 
    setComment(e.target.value)
  }

  const handleSubmit = () => {
    dispatch(createComment({
      text: comment, 
      user: getTokenFromLocalStorage("jwtToken"), 
      post: postId, 
      parentComment: null
    }))
  }

  const classes = useStyles();

  useEffect(() => {
    if(postId) {
      dispatch(fetchComments(postId))
    }
  }, [postId])

  return (
    <div>
      <Divider/>
          <Typography variant='h6' color={"gray"} style={{margin: 10}}>
            Comments
          </Typography>
      <Divider/>
      <Grid container style={{margin: 20}} spacing={2} alignItems="center">
        <Grid item xs={3}>
          <TextareaAutosize
            className={classes.textarea}
            minRows={2}
            placeholder='Add Comment ....'
            onChange={handleCommentChange}
            value={comment}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
      {
        commentState.comments.map((_) => (
          <Paper className={classes.commentContainer} elevation={0}>
            
            <Box display={"flex"}>
              <Box>
                <Avatar className={classes.avatar}>U</Avatar>
              </Box>
              <Box>
                <Box className={classes.userContainer}>
                  <Typography fontWeight={600} className={classes.userName}>{_.user.email?.split("@")[0]}</Typography>
                  <Typography fontWeight={400}>{_.text}</Typography>
                </Box>
                <Box >
                  <Button size="small" style={{textTransform: "none",}} className={classes.replyButton}>
                    Reply
                  </Button>
                </Box>
              </Box>
              
            </Box>
          </Paper>
        ))
      }
      

    </div>
  )
}
