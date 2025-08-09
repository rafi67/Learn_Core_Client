import Banner from '../Home/Banner/Banner';
import Classes from './Classes/Classes';
import Feedback from './Feedback/Feedback';
import Partner from './Partner/Partner';

const Home = () => {
  return (
    <div>
      <Banner/>
      <Partner/>
      <Classes/>
      <Feedback/>
    </div>
  );
};

export default Home;