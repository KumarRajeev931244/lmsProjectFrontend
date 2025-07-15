import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from '../assets/aboutMainImage.png';
import albert from '../assets/albert.jpg';
import nelsonMandela from '../assets/nelsonMandela.png';
import BillGates from '../assets/BillGates.jpg';
import apj from '../assets/apj.png';
import steveJobs from '../assets/steveJobs.png';

function AboutUs() {
    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                    <h1 className="text-5xl text-yellow-500 font-semibold">
                        Affordable and quality education
                    </h1>
                    <p className="text-xl text-gray-200">
                        Our platform is dedicated to making high-quality education accessible to everyone. We offer a wide range of courses designed by industry experts, ensuring that learners gain practical skills and knowledge. Whether you're looking to advance your career or explore new interests, our affordable programs are tailored to help you succeed.
                    </p>
                    </section>
                    <div className="w-1/2">
                    <img src={aboutMainImage} alt="aboutMainImage" className="drop-shadow-2xl" id="test1" style={{
                        filter: "drop-shadow(0px 10px rgb(0,0,0))"
                    }}/>
                </div>
                </div>
                {/* carousel */}

                <div className="carousel w-1/2 my-16 m-auto">
                    {/* slide 1 */}
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]"> 
                         <p className="text-xl text-gray-200 text-center">
                              "You have to dream before your dreams can come true." <br />
                        </p>
                        <h3 className="text-yellow-400">- Dr. A.P.J. Abdul Kalam</h3>
                        <img
                            src= {apj}
                            className="w-40 rounded-full border-2 border-gray-400"
                        />
                        <div className="absolute w-[50%] flex justify-between transform translate-y-1/2">
                            <a href="#slide5" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div>
                    {/* slide 2 */}
                    <div id="slide2" className="carousel-item relative w-full">
                       <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <p className="tet-xl text-gray-200">
                        "Education is the most powerful weapon which you can use to change the world." <br />
                        
                        </p>
                        <h3 className="text-yellow-400">- Nelson Mandela</h3>
                        <img
                            src= {nelsonMandela}
                            className="w-40 rounded-full border-2 border-gray-400"
                        />
                        <div className="absolute w-[50%] flex justify-between transform translate-y-1/2">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div>

                    {/* slide 3 */}
                    <div id="slide3" className="carousel-item relative w-full">
                       <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <p className="tet-xl text-gray-200">
                        "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do." <br />
                        </p>
                        <h3 className="text-yellow-400">- Steve Jobs</h3>
                        <img
                            src= {steveJobs}
                            className="w-40 rounded-full border-2 border-gray-400"
                        />
                        <div className="absolute w-[50%] flex justify-between transform translate-y-1/2">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div>

                    {/* slide 4 */}
                    
                    <div id="slide4" className="carousel-item relative w-full">
                       <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <p className="text-xl text-gray-200 text-center">
                            "Education is not the learning of facts, but the training of the mind to think." <br />
                         </p>
                         <h3 className="text-yellow-400">- Albert Einstein</h3>
                        <img
                            src= {albert}
                            className="w-40 rounded-full border-2 border-gray-400"
                        />
                        <div className="absolute w-[50%] flex justify-between transform translate-y-1/2">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide5" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div>
                    

                    {/* slide 5 */}

                    <div id="slide5" className="carousel-item relative w-full">
                       <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <p className="tet-xl text-gray-200">
                        "Don't compare yourself with anyone in this world. If you do so, you are insulting yourself." <br />
                        
                        </p>
                        <h3 className="text-yellow-400">-Bill Gates</h3>
                        <img
                            src= {BillGates}
                            className="w-40 rounded-full border-2 border-gray-400"
                        />
                        <div className="absolute w-[50%] flex justify-between transform translate-y-1/2">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div>
                </div>


            </div>
                
        </HomeLayout>
    );
}

export default AboutUs;