import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/HomeFooter";
import { HelpMsg } from "../Pages/HelpMsg";

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [IsHome, setIsHome] = useState(true);
  const slides = [
    {
      image: "/IMG-20250423-WA0007.jpg",
      caption: "Welcome to Our School Management System",
    },
    {
      image: "/IMG-20250423-WA0008.jpg",
      caption: "Empowering Education Through Technology",
    },
    {
      image: "/IMG-20250423-WA0009.jpg",
      caption: "Building Future Leaders",
    },
    {
      image: "/IMG-20250423-WA0010.jpg",
      caption: "Building Future Leaders",
    },
    {
      image: "/IMG-20250423-WA0019.jpg",
      caption: "Building Future Leaders",
    },
    {
      image: "/IMG-20250423-WA0020.jpg",
      caption: "Building Future Leaders",
    },
    {
      image: "/IMG-20250423-WA0021.jpg",
      caption: "Building Future Leaders",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>
      <Navbar setIsHome={setIsHome} />
      <div className="pt-24 bg-gradient-to-br from-zinc-800 via-slate-800 to-zinc-900 min-h-screen">
        {IsHome ? (
          <>
            <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-xl h-[50vh] md:h-[70vh]">
              <div className="relative h-full">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000  ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={`Slide ${index + 1}`}
                      className="object-fill w-full h-full px-12"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 text-white">
                      <h2 className="text-xl md:text-2xl font-bold">
                        {slide.caption}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              >
                &#10094;
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              >
                &#10095;
              </button>

              <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentSlide ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="max-w-6xl mx-auto mt-16 px-4">
              <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8">
                    <h2 className="text-3xl  font-bold text-white mb-4">
                      About Our Institution
                    </h2>
                    <p className="text-zinc-300 text-justify mb-4">
                      Pimpri Chinchwad Apang Mitra Mandal Sanchalit Apang
                      Vidyalaya, Nigdi, Pune-44, was established on June 15,
                      1989, to provide facilities exclusively to children with
                      disabilities in rural areas.
                    </p>
                    <p className="text-zinc-300 text-justify mb-4">
                      Founded with the active help of Mr. Laxmanrao Appasaheb
                      Waghmode, who himself had a disability, our institution is
                      dedicated to helping children from rural areas across
                      Maharashtra.
                    </p>
                    <p className="text-zinc-300 text-justify">
                      The Sanstha is a Registered Society and a Public Charity
                      Trust providing comprehensive residential facilities
                      including medical care, meals, clothing, and various
                      activities.
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    <img
                      src="/IMG-20250423-WA0010.jpg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-6xl mx-auto mt-16 px-4 pb-16">
              <div className="flex py-8">
                <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-lg shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    {"Vision & Mission"}
                  </h2>
                  <p className="text-indigo-100 mb-4">
                    To provide broad-based facilities exclusively to children
                    with disabilities in rural areas across Maharashtra.
                  </p>
                  <p className="text-indigo-100">
                    We envision a future where every child with disabilities has
                    access to quality education, medical care, and the
                    opportunity to develop their full potential.
                  </p>
                </div>
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            <HelpMsg setIsHome={setIsHome} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
