import { useEffect } from "react";
import styles from './index.module.css';
import { isIOS } from "react-device-detect";

const VideoPlayer = (props) => {
  const { source } = props;

  useEffect(() => {
    if (document !== undefined) {
      const player = document.querySelector("#videoBanner");

      if (!isIOS) {
        if (navigator && navigator.mediaDevices) {
          const perm = navigator.mediaDevices.getUserMedia({
            audio: true,
          });

          // eslint-disable-next-line
          perm.then(() => {
              player.muted = false;
              player.play();
            })
            .catch((e) => {
              console.log(e.message);
            });
        }
      }
    }
  }, []);

  return (
    <div className={styles.videoWrapper}>
      <video
        id="videoBanner"
        className={styles.video}
        autoPlay
        playsInline
        muted
        loop
        controls
      >
        <source src={source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
};

export default VideoPlayer;