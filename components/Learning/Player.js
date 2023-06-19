import React, { useEffect, useState } from "react";

const Player = ({ videoSrc }) => {
  const [src, setSrc] = useState(videoSrc);

  useEffect(() => {
    setSrc(videoSrc);
  }, [videoSrc]);
  return (
    <div className="video_box pt-50 pb-50">
      {/* <video key={src} width="100%" height="100%" controls>
				<source src={src && src} type="video/mp4" />
			</video> */}
      {src ? (
        <iframe
          height={"700vh"}
          width={"100%"}
          src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_VIDEO_LIBRARY_ID}/${src}?autoplay=true`}
          loading="lazy"
          allowFullScreen={true}
          //   style="border: none; position: absolute; top: 0; height: 100%; width: 100%;"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Player;
