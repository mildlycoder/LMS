import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Button from "@/utils/Button";
import * as tus from "tus-js-client";

const INITIAL_VALUE = {
  group_name: "",
  title: "",
  thumb: "",
  video: "",
  video_length: 0.0,
  is_preview: false,
  short_id: 0,
  courseId: "",
};

const UploadVideoForm = ({ courseId }) => {
  const { edmy_users_token } = parseCookies();
  const [video, setVideo] = useState(INITIAL_VALUE);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [thumbPreview, setThumbPreview] = React.useState("");
  const router = useRouter();

  useEffect(() => {
    setVideo((prevState) => ({ ...prevState, courseId }));
  }, []);

  useEffect(() => {
    let { group_name, title, video: video_url, courseId } = video;
    const isVideo = Object.values({
      group_name,
      title,
      video_url,
      courseId,
    }).every((el) => Boolean(el));
    isVideo ? setDisabled(false) : setDisabled(true);
  }, [video]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    let fileSize;
    if (name === "thumb") {
      fileSize = files[0].size / 1024 / 1024;
      if (fileSize > 2) {
        toast.error(
          "The thumb size greater than 2 MB. Make sure less than 2 MB.",
          {
            style: {
              border: "1px solid #ff0033",
              padding: "16px",
              color: "#ff0033",
            },
            iconTheme: {
              primary: "#ff0033",
              secondary: "#FFFAEE",
            },
          }
        );
        e.target.value = null;
        return;
      }
      setVideo((prevState) => ({
        ...prevState,
        thumb: files[0],
      }));
      setThumbPreview(window.URL.createObjectURL(files[0]));
    } else if (name === "video") {
      fileSize = files[0].size / 1024 / 1024;
      // if (fileSize > 5) {
      //   toast.error(
      //     "The video size greater than 5 MB. Make sure less than 5 MB.",
      //     {
      //       style: {
      //         border: "1px solid #ff0033",
      //         padding: "16px",
      //         color: "#ff0033",
      //       },
      //       iconTheme: {
      //         primary: "#ff0033",
      //         secondary: "#FFFAEE",
      //       },
      //     }
      //   );
      //   e.target.value = null;
      //   return;
      // }

      let media = new Audio(window.URL.createObjectURL(files[0]));
      media.onloadedmetadata = function () {
        setVideo((prevState) => ({
          ...prevState,
          video: files[0],
          video_length: media.duration,
        }));
      };
    } else {
      setVideo((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleVideoUpload = async (headers) => {
    try {
      // Create a new tus upload
      var upload = new tus.Upload(video.video, {
        endpoint: "https://video.bunnycdn.com/tusupload",
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
        headers,
        metadata: {
          filename: video.video.name,
          filetype: video.video.type,
        },
        // Callback for errors which cannot be fixed using retries
        onError: function (error) {
          console.log("Failed because: " + error);
        },
        // Callback for reporting upload progress
        onProgress: function (bytesUploaded, bytesTotal) {
          var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(bytesUploaded, bytesTotal, percentage + "%");
        },
        // Callback for once the upload is completed
        onSuccess: function () {
          console.log("Download %s from %s", upload.file.name, upload.url);
        },
      });

      // Check if there are any previous uploads to continue.
      upload.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload.start();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getImageType = () => {
    if (video.thumb) {
      const fileExtension = video.thumb.name.split(".").pop();
      return `image/${fileExtension}`;
    }
  };

  const handleThumbUpload = async (signedUrl) => {
    const mimeType = getImageType();
    const response = await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": mimeType },
      body: video.thumb,
    });
    console.log(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const {
        group_name,
        title,
        video_length,
        is_preview,
        short_id,
        courseId,
      } = video;

      const payloadData = {
        group_name,
        title,
        thumb: video.thumb ? true : false,
        video_length,
        image_type: getImageType(),
        is_preview,
        short_id,
        courseId,
      };
      const url = `${baseUrl}/api/courses/course/upload/new`;
      const payloadHeader = {
        headers: { Authorization: edmy_users_token },
      };

      const response = await axios.post(url, payloadData, payloadHeader);
      await handleVideoUpload(response.data.headers);

      toast.success(response.data.message, {
        style: {
          border: "1px solid #4BB543",
          padding: "16px",
          color: "#4BB543",
        },
        iconTheme: {
          primary: "#4BB543",
          secondary: "#FFFAEE",
        },
      });

      // setLoading(false);

      // router.push(`/instructor/course/uploads/${courseId}`);
    } catch (err) {
      let {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, {
        style: {
          border: "1px solid #ff0033",
          padding: "16px",
          color: "#ff0033",
        },
        iconTheme: {
          primary: "#ff0033",
          secondary: "#FFFAEE",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Video Group Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Group Title"
              name="group_name"
              value={video.group_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Video Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Video Title"
              name="title"
              value={video.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              Select Thumbnail Image
            </label>
            <input
              type="file"
              className="form-control file-control"
              name="thumb"
              onChange={handleChange}
              required={true}
            />
            <div className="form-text">Upload image size 1280x720!</div>

            <div className="mt-2">
              <img
                src={
                  thumbPreview ? thumbPreview : "/images/courses/course-1.jpg"
                }
                alt="image"
                className="img-thumbnail w-100px me-2"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Select Video</label>
            <input
              type="file"
              className="form-control file-control"
              name="video"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              Video Order Number (Ascending)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Group Title"
              name="short_id"
              value={video.short_id}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="checkbox"
              className="form-check-input"
              id="is_preview"
              defaultChecked={video.is_preview}
              onChange={(e) =>
                setVideo((prevState) => ({
                  ...prevState,
                  is_preview: !video.is_preview,
                }))
              }
            />{" "}
            <label className="form-check-label" htmlFor="is_preview">
              Preview Video?
            </label>
          </div>
        </div>

        <div className="col-12">
          <Button
            loading={loading}
            disabled={loading || disabled}
            btnText="Upload Video"
            btnClass="default-btn"
          />
        </div>
      </div>
    </form>
  );
};

export default UploadVideoForm;
