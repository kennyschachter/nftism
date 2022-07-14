import React from "react";
import Image from "next/image";
import Head from "next/head";
import LandingLayout from "@components/layouts/LandingLayout";
import BuyForm from "@components/BuyForm/BuyForm";
import styles from "./index.module.css";
import VideoPlayer from "@components/VideoPlayer";

const Raffle = ({ result, value: { showBuyForm, setShowBuyForm } }) => {
  return (
    <LandingLayout value={{ showBuyForm, setShowBuyForm }}>
      <div className={styles.home}>
        <Head>
          <title>Nftism</title>
          <meta name="description" content="nftism app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <div className={styles.videoWrapper}>
          <video
            id="videoBanner"
            className={styles.video}
            autoPlay
            playsInline
            muted
            loop
            controls
          >
            <source src={process.env.HERO_VIDEO_PATH} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}
        <VideoPlayer source={process.env.NEXT_PUBLIC_HERO_VIDEO_PATH} />
        <h1 className={styles.title}>RAFFLE</h1>
        {result.length &&
          result.map((raffle, index) => (
            <div className={styles.raffle} key={index}>
              <div className={`${styles.raffle_img} image-${index}`}>
                <Image
                  src={raffle.images.data.attributes.url}
                  alt={raffle.title}
                  layout="fill"
                />
              </div>
              <div className={styles.raffle_content}>
                <div className={styles.raffle_text}>
                  <h1>{raffle.title}</h1>
                  <p>{raffle.description}</p>
                </div>
                <div>
                  <button
                    className={styles.enter_btn}
                    onClick={() => setShowBuyForm(true)}
                  >
                    ENTER
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <BuyForm
        value={{
          showBuyForm,
          setShowBuyForm,
        }}
      />
    </LandingLayout>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_HOST}/api/raffles?populate=*`
  );
  const data = await res.json();
  const result = data.data.map((d) => d.attributes);

  return {
    props: { result },
    revalidate: 10,
  };
}

export default Raffle;
