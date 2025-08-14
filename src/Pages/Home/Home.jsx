import Banner from './Banner/Banner';
import BecomeAnInstructor from './BecomeAnInstructor/BecomeAnInstructor';
import CampusVideo from './CampusVideo/CampusVideo';
import Classes from './Classes/Classes';
import Feedback from './Feedback/Feedback';
import Partner from './Partner/Partner';
import SkilledInstructor from './SkilledInstructor/SkilledInstructor';
import Stats from './Stats/Stats';

const Home = () => {
  return (
    <div>
      <Banner/>
      <Partner/>
      <Classes/>
      <Feedback/>
      <Stats/>
      <BecomeAnInstructor/>
      <CampusVideo/>
      <SkilledInstructor/>
    </div>
  );
};

export default Home;