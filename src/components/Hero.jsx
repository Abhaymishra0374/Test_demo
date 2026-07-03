import myimg from "../assets/Abhay Passport pic.png"
function Hero() {
  return (
    <section className="container my-5">
      <div className="row align-items-center ">
        <div className="col-lg-6">
            <img src = {myimg} alt="About Us" className='img-fluid rounded-circle shadow-lg my-2 w-25'/>
        </div>
        <div className="col-lg-6">
          <h1>I'm Abhay</h1>
          <p>I'm a passionate web developer with a love for creating dynamic and user-friendly websites. With a strong foundation in HTML, CSS, and JavaScript, I enjoy bringing ideas to life through clean and efficient code. My goal is to continuously learn and grow in the ever-evolving world of web development, while delivering high-quality solutions that exceed client expectations.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;