import Marquee from "react-fast-marquee";

const Partner = () => {
  const partners = [
    "https://img.icons8.com/?size=100&id=yqf95864UzeQ&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=22989&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=30840&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=106755&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=38607&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=34832&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=PvvcWRWxRKSR&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=doXmogC0imya&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=21295&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=20272&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=k8oYSR64kEmU&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=Ckq67kItoLQa&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=vCJbVnk1FbiO&format=png&color=000000",
  ];
  return (
    <>
      {/* partner section */}
      <div className="text-center mt-12">
        <h1 className="mb-6 md:mb-10 xl:mb-16 text-xl lg:text-5xl font-bold">Our Partners</h1>
        <Marquee>
          {partners.map((partner) => (
            <img className="w-[40px] md:w-[50px] xl:w-[80px] ml-2 md:ml-3 xl:ml-6" src={partner} alt="" />
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default Partner;
