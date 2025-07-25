import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";

const videos = [
  {
    id: "wVBf39WPInc",
    title: "Bharwo k khiladi",
    description: "A hilarious khatron k khiladi spoof for fun",
  },
  {
    id: "5d2iztjXNPE",
    title: "Trying Food Hacks So You Don't Have To",
    description: "",
  },
  {
    id: "KKnhgkmV7k8",
    title: "Printing Engineering",
    description: "Comedy on Printing Engineering",
  },
  {
    id: "yXy1PxHUCfI",
    title: "Stand-up Special",
    description: "Latest comedy routine on everyday absurdities.",
  },
  {
    id: "nG8af3PbEaQ",
    title: "Stand-up Special",
    description: "Latest comedy routine on everyday absurdities.",
  },
  {
    id: "8_Lc5EgNMuM",
    title: "Stand-up Special",
    description: "Latest comedy routine on everyday absurdities.",
  },
];

const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytEmbedUrl = (id) => `https://www.youtube.com/embed/${id}?autoplay=1`;

export default function FeaturedVideos() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 20 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 32 } },
      "(min-width: 1820px)": { slides: { perView: 6, spacing: 48 } },
    },
  });

  const [openVideo, setOpenVideo] = useState(null);

  return (
    <section className=" text-white py-10 bg-red-600 ">
      <div className="max-w-full py-10  mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-subHead text-6xl underline bg-black border-2 py-6 underline-offset-8 font-bold mb-12 text-center"
        >
          Featured Videos
        </motion.h2>

        <div ref={sliderRef} className="keen-slider">
          {videos.map((video, i) => (
            <div key={video.id} className="keen-slider__slide">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.18 }}
                className="flex flex-col bg-gray-900/80 rounded-2xl shadow-xl h-full"
              >
                <div className="relative group overflow-hidden rounded-t-2xl min-h-[16rem] flex justify-center items-center">
                  {openVideo === video.id ? (
                    <iframe
                      src={ytEmbedUrl(video.id)}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-64 rounded-t-2xl"
                    />
                  ) : (
                    <>
                      <img
                        src={ytThumb(video.id)}
                        alt={video.title}
                        className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/40 group-hover:bg-black/60">
                        <div className="bg-white/90 rounded-full p-4 shadow-lg transition-all group-hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 48 48"
                            className="w-10 h-10 text-red-600"
                          >
                            <path d="M16 12v24l20-12z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold mb-3">{video.title}</h3>
                  <p className="mb-4 text-gray-300 flex-1">
                    {video.description || "Enjoy this comedy piece!"}
                  </p>
                  {openVideo === video.id ? (
                    <button
                      className="inline-block mt-auto px-5 py-2 rounded-lg bg-gradient-to-r from-black to-red-700 text-white font-semibold shadow transition-colors"
                      onClick={() => setOpenVideo(null)}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      className="inline-block mt-auto px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-black text-white font-semibold shadow hover:from-black hover:to-red-700 transition-colors"
                      onClick={() => setOpenVideo(video.id)}
                    >
                      Watch Now
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
