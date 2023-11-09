import  React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { clearError, registerUser } from '../../store/actions/authActions';
import { EmailOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, AlertTitle, IconButton, InputAdornment } from '@mui/material';
import {useSelector} from "react-redux"
import Copyright from '../../components/copyRight';
import { useNavigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../../utils/helpers';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const reduxStore = useSelector((state) => state);
  const [ showPassword, setShowPassword ] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }
    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    if (!newErrors.email && !newErrors.password) {
      dispatch(registerUser(formData))
    }
  };

  useEffect(() => {
    if(reduxStore.auth.registrationError) {
      setTimeout(() => {
        dispatch(clearError())
      }, 5000)
    }
  }, [reduxStore.auth?.registrationError])

  useEffect(() => {
    const token = reduxStore.auth?.token || getTokenFromLocalStorage("jwtToken")
    if(token) {
      navigate("/post");
    }
  }, [reduxStore.auth?.token])

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8, mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New User Please Register 
          </Typography>

          {
            reduxStore.auth.registrationError &&
            <Alert severity={"error"}>
              <AlertTitle>
                {reduxStore?.auth.registrationError?.message} {reduxStore?.auth.registrationError.text}
              </AlertTitle>
            </Alert>
          }

          {
            reduxStore.auth.token &&
            <Alert severity={"success"}>
              <AlertTitle>
                Registered Successfull Redirecting !!!
              </AlertTitle>
            </Alert>
          }
      
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton >
                      <EmailOutlined/>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login In"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}