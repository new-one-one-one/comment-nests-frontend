import { Button, Divider, Grid, TextareaAutosize } from '@mui/material'
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

  console.log({
    commentState
  })

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchComments(postId))
  }, [])

  return (
    <div>
      <Divider/>
          Comments
      <Divider/>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
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
    </div>
  )
}
