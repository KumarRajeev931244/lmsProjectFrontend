function CarouselSlide({image, title, description, slideNumber, totalSlide}) {
    return (
        <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
                               <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                                <p className="text-xl text-gray-200 text-center">
                                    {description} <br />
                                 </p>
                                 <h3 className="text-yellow-400">{title}</h3>
                                <img
                                    src= {image}
                                    className="w-40 rounded-full border-2 border-gray-400"
                                />
                                <div className="absolute w-[50%] flex justify-between transform translate-y-1/2">
                                    <a href={`#slide${(slideNumber == 1 ? totalSlide : (slideNumber - 1))}`} className="btn btn-circle">❮</a>
                                    <a href={`#slide${(slideNumber)%totalSlide + 1}`} className="btn btn-circle">❯</a>
                                </div>
                                </div>
                            </div>
      );
}

export default CarouselSlide;