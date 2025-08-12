import Instructor from '../../components/InstructorCard/Instructor';
import Banner from './Banner/Banner';
import Classes from './Classes/Classes';
import Feedback from './Feedback/Feedback';
import Partner from './Partner/Partner';
import Stats from './Stats/Stats';

const Home = () => {
  return (
    <div>
      <Banner/>
      <Partner/>
      <Classes/>
      <Feedback/>
      <Stats/>
      <Instructor/>
    </div>
  );
};

export default Home;