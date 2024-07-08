import React from 'react';
import Movies from '../movies/Movies';
import Series from '../series/Series'
import Cartoons from '../cartoons/Cartoons'
import AnimatedSeries from '../animatedSeries/AnimatedSeries';

function HomePage() {
    return (
        <div>
          <Movies />
          <Series />
          <Cartoons />
          <AnimatedSeries />
        </div>
    );
}

export default HomePage;
