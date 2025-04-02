const Home = () => {
  return (
    <section className="home">
        <video autoPlay muted loop playsInline>
          <source
            src="https://wonder-theme-beauty.myshopify.com/cdn/shop/videos/c/vp/063ff447dae24d7c9b3b608befaf811e/063ff447dae24d7c9b3b608befaf811e.HD-720p-1.6Mbps-39946194.mp4?v=0"
            type="video/mp4"
          />
        </video>
      <div className="container">
        <div className="row">
          <h1 className="homeTitle">Welcome Wonder beauty theme Dashboard</h1>
        </div>
      </div>
    </section>
  );
};

export default Home;
