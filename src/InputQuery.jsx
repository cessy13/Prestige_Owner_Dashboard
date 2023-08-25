import { useState } from "react";
import PropertyFeature from "./PropertyFeature";
// import Booking from "./Booking";
import featuredPic from "./assets/imgs/featured-pic.jpg";
import "./App.css";

const url = `https://prestigevacationsaruba.com/home/l9a83689812699/vrp/vrpexport/vrpexport_xprop.xml`;

function InputQuery() {
  // const [ownerid, setOwnerID] = useState();
  const [propData, setPropData] = useState([]);
  const [propDetails, setPropDetails] = useState({
    pname: "Hotel California",
    pdesc: "This is the first hotel",
    pimg: featuredPic,
  });

  function handlePropData(e) {
    e.preventDefault();
    let ownerID = parseInt(document.querySelector(".owner-id").value);
    // setOwnerID(...ownerid, ownerID);
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        let xProps = xml.getElementsByTagName("xprop");
        let xpropid, xpropname, xpropdesc, xpropimg;
        let xData = [];

        for (let i = 0; i < xProps.length; i++) {
          xpropid = xProps[i].children[0].innerHTML;
          xpropname = xProps[i].childNodes[3].innerHTML;
          xpropdesc = xProps[i].children[4].textContent;
          xpropimg = xProps[i].childNodes[23].innerHTML;

          //populate array
          xData.push({
            id: parseInt(xpropid),
            propname: xpropname,
            propdesc: xpropdesc,
            propimg: xpropimg,
          });
        }

        setPropData(...propData, xData);
        // console.log(propData);

        for (let i = 0; i < propData.length; i++) {
          if (ownerID == propData[i].id) {
            let result = {
              pname: propData[i].propname,
              pdesc: propData[i].propdesc,
              pimg: propData[i].propimg,
            };
            // console.log(result);
            setPropDetails({
              ...propDetails,

              pname: result.pname,
              pdesc: result.pdesc,
              pimg: result.pimg,
            });
          }
        }
      });
  }

  return (
    <div className="home-page">
      <h1>Welcome to Prestige Owner Dashboard</h1>
      <form onSubmit={handlePropData}>
        <label for="owner-id">Enter Owner ID: </label>
        <input type="text" className="owner-id" name="owner-id" required />
        <br />
        <label for="kpi-month">KPI Report For</label>
        <input
          type="month"
          className="kpi-month"
          name="kpi-month"
          min="2022-01"
          value="2023-08"
        />
        <br />

        <button>SUBMIT</button>
      </form>
      <PropertyFeature
        propname={propDetails.pname}
        propdesc={propDetails.pdesc}
        propimg={propDetails.pimg}
      />
      {/* <Booking ownerID={ownerid} /> */}
    </div>
  );
}

export default InputQuery;
