export default function TailwindFilters() {
  const src = "/images/reactjs.jpg";

  return (
    <div>
      <h2 className="text-2xl font-bold">Blurs</h2>

      <div className="flex">
        <img className="blur-none w-1/4" src={src} alt="blur none" />
        <img className="blur-sm w-1/4" src={src} alt="blur sm" />
        <img className="blur-lg w-1/4" src={src} alt="blur lg" />
        <img className="blur-2xl w-1/4" src={src} alt="blur 2xl" />
      </div>

      <h3 className="text-lg font-bold mt-4">
        My contrast examples
        </h3>

        <div className="flex">
        <img className="contrast-50 w-1/4" src={src} alt="low contrast" />
        <img className="contrast-100 w-1/4" src={src} alt="normal contrast" />
        <img className="contrast-150 w-1/4" src={src} alt="higher contrast" />
        <img className="contrast-200 w-1/4" src={src} alt="highest contrast" />
        </div>

      {/* AI */}
      <h3 className="text-lg font-bold mt-4">
        Grayscale and brightness
      </h3>

      <div id="wd-ai-filters" className="flex">
        <img className="grayscale w-1/4" src={src} alt="grayscale" />
        <img className="grayscale-0 w-1/4" src={src} alt="no grayscale" />
        <img className="brightness-50 w-1/4" src={src} alt="50% brightness" />
        <img className="brightness-150 w-1/4" src={src} alt="150% brightness" />
      </div>
    </div>
  );
}