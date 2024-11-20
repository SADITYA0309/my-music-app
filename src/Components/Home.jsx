import LyricsFetcher from './LyricsFetcher';

const Home = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Music App</h1>
      <LyricsFetcher />
    </div>
  );
};

export default Home;
