import React from "react";
import {
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Button,
  Grid2,
} from "@mui/material";
import CardCover from "../../components/Card";
import Editor from "../../components/TextEditor";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { getAllTypeOfBlogs } from "../../firebase/Blogs/blogs";
import { convertImageToBase64 } from "../../utils/helper";
import toast from "react-hot-toast";
import { addBlog } from "../../firebase/Blogs/blogs";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const methods = useForm();
  const navigate = useNavigate();
  const [postThumbnail, setPostThumbnail] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState([]);
  const [content, setContent] = React.useState("");

  const fetchData = async () => {
    try {
      let result = await getAllTypeOfBlogs();
      setSelectedType(result.filter((item) => item.name !== "Home"));
    } catch (error) {
      toast.error("OOPS, Có lỗi rồi 〒▽〒");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const curDate = new Date();
    if (content === "") {
      toast.error("Nội dung bài viết không được để trống");
      setLoading(false);
      return;
    }
    try {
      const base64Thumbnail = await convertImageToBase64(postThumbnail);
      const resData = await addBlog({
        ...data,
        content: content,
        date: curDate,
        thumbnail: base64Thumbnail,
      });
      console.log(resData);
      if (resData.success) {
        toast.success(resData.message);
        navigate("/home-page");
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error("Error converting image to Base64:", error);
    }
    setLoading(false);
  };

  return (
    <Grid2
      container
      sx={{
        width: "100%",
        height: "auto",
        minHeight: "calc(100vh - 64px)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid2 item sx={{ height: "100%", minWidth: "450px", width: "auto" }}>
        <CardCover hasShadow={false}>
          <Stack sx={{ padding: "20px" }} alignItems={"center"} gap={2}>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                style={{ width: "100%" }}
              >
                <Grid2
                  container
                  xs={12}
                  md={12}
                  spacing={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                >
                  <Grid2
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Tiêu đề bài viết</Typography>
                    <Controller
                      name="title"
                      control={methods.control}
                      sx={{ width: "100%" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Tiêu đề bài viết"
                          variant="outlined"
                          size="small"
                          name="title"
                          required
                        />
                      )}
                    />
                  </Grid2>

                  <Grid2
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Loại bài viết</Typography>
                    <Controller
                      name="type"
                      control={methods.control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          sx={{ width: "100%" }}
                          variant="outlined"
                          size="small"
                          required
                        >
                          {selectedType &&
                            selectedType.map((item) => (
                              <MenuItem key={item.id} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                  </Grid2>

                  <Grid2
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Thumbnail bài viết</Typography>
                    <Controller
                      name="thumbnail"
                      control={methods.control}
                      sx={{ width: "100%" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Tiêu đề bài viết"
                          variant="outlined"
                          size="small"
                          onChange={(e) => setPostThumbnail(e.target.files[0])}
                          name="thumbnail"
                          type="file"
                          required
                        />
                      )}
                    />
                  </Grid2>

                  <Grid2
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Nội dung bài viết</Typography>
                    <Editor setContent={setContent} />
                  </Grid2>
                </Grid2>
                <Button
                  type="submit"
                  variant="contained"
                  loading={loading}
                  sx={{
                    marginTop: "10px",
                    float: "right",
                    backgroundColor: "var(--secondary-color)",
                    textTransform:'none'
                  }}
                >
                  Tạo bài viết
                </Button>
              </form>
            </FormProvider>
          </Stack>
        </CardCover>
      </Grid2>
      ,
    </Grid2>
  );
}
