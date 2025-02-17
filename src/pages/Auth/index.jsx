import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import CardCover from "../../components/Card";
import { Stack, Typography, TextField, Button, Grid2 } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { signIn, loginAsGuest } from "../../firebase/Auth/authentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      toast(result.message);
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
      }}
    >
      <Grid2 item sx={{ height: "400px", minWidth: "450px", width: "35vw" }}>
        <CardCover>
          <Stack sx={{ padding: "20px" }} alignItems={"center"} gap={2}>
            <Typography variant="h5">Đăng Nhập</Typography>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                style={{ width: "100%" }}
              >
                <Stack display={"flex"} gap={2}>
                  <Stack sx={{ width: "100%" }}>
                    <Typography>Email</Typography>
                    <Controller
                      name="email"
                      control={methods.control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Email"
                          size="small"
                        />
                      )}
                    />
                  </Stack>
                  <Stack sx={{ width: "100%" }}>
                    <Typography>Mật khẩu</Typography>
                    <Controller
                      name="password"
                      control={methods.control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Mật khẩu"
                          type={showPassword ? "text" : "password"}
                          size="small"
                          InputProps={{
                            endAdornment: (
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
                            ),
                          }}
                        />
                      )}
                    />
                  </Stack>

                  <Button
                    type="submit"
                    loading={loading}
                    variant="contained"
                    sx={{
                      backgroundColor: "rgba(0, 95, 115)",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Stack>
              </form>
            </FormProvider>
            <Typography>Hoặc</Typography>

            <Button
              onClick={handleLoginAsGuest}
              loading={loading}
              variant="outlined"
              sx={{ width: "100%" }}
            >
              Đăng nhập với tư cách khách
            </Button>
          </Stack>
        </CardCover>
      </Grid2>
    </Grid2>
  );
}
