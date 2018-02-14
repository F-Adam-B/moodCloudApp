import React, { Component } from 'react';
import {connect} from 'react-redux';
import { toggleView } from '../../actions/views';

import Footer from './Footer';

import './Features.css';

export class Features extends Component {
  componentDidMount() {
    this.props.dispatch(toggleView('features'));
  }

  render() {
    return(
      <div className='features-container'>
        
        <div className='top-section'>
          <img className='features-image-1' src="http://www.comnetwork.org/wp-content/uploads/2015/12/ComNet15-Recap-Journalism-Art-and-Impact-Blending-Journalism-Storytelling-and-the-Arts-to-Engage-Communities-to-Bring-About-Change.jpg" alt='multi colored clouds'/>
          {/* <img src="http://www.stmphotography.ca/uploads/2/6/0/6/26065498/7993691_orig.png" alt="blue and yellow clouds"/> */}
          <h2 className='feature-title'>Key Features</h2>
        </div>
        
        <div className='features-sub-sections'>
          <div className='feature-1-section feature-detail'>
            <div className='feature-description'>
              <h3 className='feature-number'>Mood Grids</h3>
              <p className='feature-small-description'>Inspired by the Yale Center for Emotional Intelligence, students can record their moods by choosing from 100 emotional states via mood grids. The mood grids are intelligently laid out, guiding the users with its color schema. Students voluntarily share their moods with teachers, notifying them in times of critical need.</p>
            </div>
            <img className='laptop-view' src="http://res.cloudinary.com/adpoyao/image/upload/v1517536297/Mood%20Cloud/macbookgold_front-1.png" alt='Student Mood Cloud' />
          </div>
        </div>

        <div className='features-sub-sections'>
          <div className='feature-2-section feature-detail'>
          <img className='laptop-view' src="http://res.cloudinary.com/adpoyao/image/upload/v1517536337/Mood%20Cloud/moodcloud-f1.png" alt='student mood grid' />

          <div className='feature-description'>
              <h3 className='feature-number'>Mood Cloud</h3>
              <p className='feature-small-description'>Moods submitted by students are displayed in a word cloud. Each word's size corresponds to frequency of submissions. Students can build self-awareness by having a visual monitor over their emotional patterns.</p>
            </div>
          </div>
        </div>
          
        <div className='features-sub-sections'>
          <div className='feature-3-section feature-detail'>
          <div className='feature-description'>
              <h3 className='feature-number'>Connections</h3>
              <p className='feature-small-description'> An up-to-date dashboard provides teachers with an an ongoing overview of their students' emotional wellbeing, instantly alerting them when students submit a critical mood. This gives teachers an opportunity to reach out.</p>
            </div>
            <img className='laptop-view' src="http://res.cloudinary.com/adpoyao/image/upload/v1517537202/Mood%20Cloud/moodcloud-f2.png" alt='Teacher Alert Dashboard' />
          </div>
        </div>

        <div className='features-sub-sections'>
          <div className='feature-4-section feature-detail'>
          <img className='laptop-view' src="http://res.cloudinary.com/adpoyao/image/upload/v1517537292/Mood%20Cloud/moodcloud-f4.png" alt='Student Mood Cloud' />
          <div className='feature-description'>
              <h3 className='feature-number'>Panic Button</h3>
              <p className='feature-small-description'>In times of dire need or bystander-effects, such as bullying, students may alert their teachers at the touch of a Panic Button. This instantly connects the student with all of their linked teachers in a chatroom to real-time communication.</p>
            </div>
          </div>
        </div>
        

        <Footer />
      </div>
    )
  }
}

export default connect()(Features);
