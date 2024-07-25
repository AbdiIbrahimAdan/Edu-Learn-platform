import "./Hero.css"
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <>
     <section className="hero">
      <div className="container">
        <div className="hero-text">
        <h1> Welcome To Edulearn</h1>
        <h2>The Best Education Platform </h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos provident non aliquam debitis nostrum molestiae quam temporibus, excepturi eos tempora ipsam labore magni atque voluptates quidem velit voluptas? Illo, quaerat?</p>
        <div className="button">
         
          <Link to='/courses' className='primary-btn'>Explore Courses</Link>
        </div>
        </div>
      </div>
     </section>
    </>
  )
}

export default Hero;
