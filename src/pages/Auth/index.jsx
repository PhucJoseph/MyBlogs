import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import CardCover from "../../components/Card";
import { Stack, Typography, Button, Grid2 } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { signIn, loginAsGuest } from "../../firebase/Auth/authentication";
import { useNavigate } from "react-router-dom";
import Input from '@mui/material/Input';

import toast from "react-hot-toast";

import "./Auth.css";

export default function Login() {
  const methods = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await signIn(data.email, data.password);
    if (result.success) {
      toast.success(result.message);

      setTimeout(() => {
        navigate("/home-page");
      }, 1000);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const handleLoginAsGuest = async () => {
    setLoading(true);
    const result = await loginAsGuest();
    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        navigate("/home-page");
      }, 1000);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  return (
    <Grid2
      container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient( #FFFFFF 0%, #0456CB 100%)",
      }}
    >
      <Grid2 item sx={{ height: "30rem", minWidth: "450px", width: "45vw" }}>
        <CardCover>
          <Stack sx={{ padding: "40px" }} alignItems={"center"} gap={2}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "var(--font-text-SSP)",
                color: "#3670C6",
                fontWeight: "bold",
              }}
            >
              Sign in
            </Typography>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                style={{ width: "100%" }}
              >
                <Stack display={"flex"} gap={2}>
                  <Stack sx={{ width: "100%" }}>
                    <Typography sx={{ fontFamily: "var(--font-text-SSP)" }}>
                      Email
                    </Typography>
                    <Controller
                      name="email"
                      control={methods.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Email"
                          size="small"
                          sx={{marginTop:'5px'}}
                        />
                      )}
                    />
                  </Stack>
                  <Stack sx={{ width: "100%" }}>
                    <Typography sx={{ fontFamily: "var(--font-text-SSP)" }}>
                      Mật khẩu
                    </Typography>
                    <Controller
                      name="password"
                      control={methods.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Mật khẩu"
                          type={showPassword ? "text" : "password"}
                          size="small"
                          variant="outlined"
                          sx={{marginTop:'5px'}}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                  </Stack>

                  <Button
                    type="submit"
                    loading={loading}
                    variant="contained"
                    className="button-auth-DN"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </FormProvider>
            <Typography sx={{ fontFamily: "var(--font-text-SSP)" }}>Or</Typography>

            <Button
              onClick={handleLoginAsGuest}
              loading={loading}
              variant="outlined"
              className="button-auth-guest"
            >
              Login as Guest
            </Button>
          </Stack>
        </CardCover>
      </Grid2>
    </Grid2>
  );
}
