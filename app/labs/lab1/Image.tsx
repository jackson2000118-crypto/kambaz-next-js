export default function Images() {
  return (
    <div id="wd-images">
      <h4>Image tag</h4>
      Loading an image from the internet:
      <br />
      <img
        id="wd-starship"
        width={400}
        alt="Starship"
        src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
      />
      <br />
      Loading a local image:
      <br />
      <img
        id="wd-teslabot"
        src="/images/teslabot.jpg"
        height={200}
        alt="Tesla Bot (Optimus) humanoid robot"
      />
      <br />
      <h5>My image</h5>
      <img
        id="wd-your-image"
        src="/images/Chef.jpg"
        width={300}
        alt="My cat Chef lying on a bed"
      />
    </div>
  );
}