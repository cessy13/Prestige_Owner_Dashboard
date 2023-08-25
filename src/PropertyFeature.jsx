import featuredPic from "./assets/imgs/featured-pic.jpg";
function PropertyFeature({ propname, propdesc, propimg }) {
  return (
    <div>
      <h1>{propname}</h1>
      <div className="prop-details">
        <div className="prop-img">
          <img src={propimg} alt="property-image" />
        </div>
        <div>
          <p className="prop-desc">{propdesc}</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyFeature;
