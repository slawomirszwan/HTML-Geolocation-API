import {
  hasGeolocationApi,
  getCurrentPosition,
  // watchPosition,
  // clearWatch,
  // formatPosition,
  // formatPositionError,
} from "./geolocation.js";

import { prepareEnvironment, addMessage } from "./flashMessage.js";

console.log(`obsługiwana geolokacja ${hasGeolocationApi()}`);

prepareEnvironment();

var getLocation = () => {
  getCurrentPosition().then(
    (position) => {
      console.log(position);
      //message => JSON.stringify(position) //stringify nie działa wgłąb prototype

      addMessage({
        message: `<pre>${position.show()}</pre>`,
        timeout: 20000,
      });
    },
    (positionError) => {
      console.log(positionError);
      addMessage({
        message: `<pre>${positionError.show()}</pre>`,
        type: "error",
      });
    }
  );
};

document.querySelector("#go").addEventListener("click", getLocation);
