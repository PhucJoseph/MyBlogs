export default class CloudinaryUploadAdapter {
  constructor(loader, cloudName, uploadPreset) {
    this.loader = loader;
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", this.uploadPreset);

          fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.secure_url) {
                // ✅ Optimize with Cloudinary transformations
                const optimizedUrl = data.secure_url.replace(
                  "/upload/",
                  "/upload/w_400,c_limit/"
                );

                resolve({ default: optimizedUrl });
              } else {
                reject(data.error?.message || "Upload failed");
              }
            })
            .catch((err) => reject(err));
        })
    );
  }

  abort() {
    // optional
  }
}