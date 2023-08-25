import { useState } from "react";

const url2 = `https://prestigerealtyftp.com/prestige/vrp/private/allpropsdata-
random7904/vrpexport_xprivav.xml`;

function Booking({ ownerID }) {
  console.log(ownerID);
  const [bkList, setbklist] = useState();
  const [propID, setpropid] = useState();
  fetch(url2)
    .then((response) => response.text())
    .then((data) => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xml");
      let xprivav = xml.getElementsByTagName("xprivav");
      console.log(xprivav);

      for (let i = 0; i < xprivav.length; i++) {
        let propID = parseInt(xprivav[i].childNodes[1].innerHTML);
        if (propID == ownerID) {
          let bkList = xprivav[i].childNodes[7].innerHTML;
          console.log(bkList);
        }
      }
    });

  return (
    <div>
      <label for="nights-bk">Total # of Nights Booked: </label>
      <input type="text" className="nights-bk" name="nights-bk" disabled />
    </div>
  );
}

export default Booking;
