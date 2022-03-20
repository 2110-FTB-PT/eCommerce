/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React from 'react'; 
import {
  Coffeedemo,
  Teademo
} from '../img'; 
import '../css/Home.css'; 


const Home = () => { 

  return <main className='home'>
    <nav>
      <h2 className='coffee title'>Our Coffee</h2> 
      <p className='coffee para'>
        We are dedicated to the future of the coffee industry, coffee farming communities, and our upstream supply chain partners. From the stores we build to the products we serve, Grace Shopper guarantees that responsible sourcing is at the heart of every decision we make. Every cup begins with our commitment to sustainability and responsible sourcing.
      </p> 
    </nav> 
    <nav>
      <img className='idemo cdemo' src={Coffeedemo} alt='a cup of mocha coffee' />
    </nav>
    <nav className='tea'>
      <img className='idemo tdemo' src={Teademo} alt='a set of tea, cup and pot' /> 
    </nav>
    <nav>
      <h2 className='tea title'>Our Tea</h2> 
      <p className='tea para'>
        Our beloved loose leaf tea samplers usher you into a mindful, joyful space. Looking to discover a new favorite tea? Inviting a friend, colleague, or loved one to the experience? We've got you covered with mindfully curated tea sampler gift sets boxed in beautiful eco-friendly packaging! 
      </p>
    </nav> 
  </main> 
} //Home() 

export default Home; 

