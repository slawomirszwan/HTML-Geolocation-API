"use strict;";
/**
interface Geolocation {
    clearWatch(watchId: number): void;
    getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): void;
    watchPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): number;
}

declare var Geolocation: {
    prototype: Geolocation;
    new(): Geolocation;
};

interface GeolocationCoordinates {
    readonly accuracy: number;       Returns a double representing the accuracy of the latitude and longitude properties, expressed in meters.
    readonly altitude: number | null;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number | null;
}

declare var GeolocationCoordinates: {
    prototype: GeolocationCoordinates;
    new(): GeolocationCoordinates;
};

interface GeolocationPosition {
    readonly coords: GeolocationCoordinates;
    readonly timestamp: number;
}

declare var GeolocationPosition: {
    prototype: GeolocationPosition;
    new(): GeolocationPosition;
};

interface GeolocationPositionError {
    readonly code: number;
    readonly message: string;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
}

declare var GeolocationPositionError: {
    prototype: GeolocationPositionError;
    new(): GeolocationPositionError;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
};

interface PositionOptions {
    enableHighAccuracy?: boolean;
    maximumAge?: number;
    timeout?: number;
}
*/

/*******************************************************
 * czy przeglądarka obsługuje api geolokacji
 */
const hasGeolocationApi = (navigator = window.navigator) =>
  "geolocation" in navigator;

/*********************************************************
 *
 * @param {*} options
 */
const getCurrentPosition = (options) => {
  const navigator = window.navigator;

  //------------------------
  options = options || {
    /**
     * wysoka dokładność - może być dłuzszy czas ustalania pozycji, większe zużycie energii
     * gdy false szybsze ustalenie ale mniej dokładne
     * domyślnie false
     */
    enableHighAccuracy: false,
    /**
     *Is a positive long value indicating the maximum age in milliseconds of a possible cached position 
     that is acceptable to return. 
     If set to 0, it means that the device cannot use a cached position and must attempt to retrieve 
     the real current position. If set to Infinity the device must return a cached position regardless of its age. 
     Default: 0
     */
    maximumAge: 0,
    /**
     * Is a positive long value representing the maximum length of time (in milliseconds) the device
     * is allowed to take in order to return a position.
     * NUmber, 1000 sekunda
     * jak długo jesteśmy w stanie czekać na pozycję
     * domyslnie czekamy do skutku, w nieskończoność Infinity
     */
    timeout: Infinity,
  };

  return new Promise((resolve, reject) => {
    if (!hasGeolocationApi()) {
      const error = {
        code: 100,
        message: "Brak obsługi usługi geopozycjonowania",
      };
      reject(error);
      return;
    }
    //--------------------
    const successCallback = (position) => {
      //position: GeolocationPosition
      /**
       * interface GeolocationPosition {
       * readonly coords: GeolocationCoordinates;
       * readonly timestamp: number;
       * }
       */
      resolve(position);
    };
    //--------------------
    const errorCallback = (positionError) => {
      //(positionError: GeolocationPositionError)
      /**
       * interface GeolocationPositionError {
          readonly code: number;
          readonly message: string;
          readonly PERMISSION_DENIED: number;
          readonly POSITION_UNAVAILABLE: number;
          readonly TIMEOUT: number;
         }
       */
      reject(positionError);
    };

    /**
     * getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): void;
     */
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  });
};

//----------------------------------------------------
/**
 *
 * @param {*} options
 */
const watchPosition = (options) => {
  const navigator = window.navigator;

  //------------------------
  options = options || {
    /**
     * wysoka dokładność - może być dłuzszy czas ustalania pozycji, większe zużycie energii
     * gdy false szybsze ustalenie ale mniej dokładne
     * domyślnie false
     */
    enableHighAccuracy: false,
    /**
     *Is a positive long value indicating the maximum age in milliseconds of a possible cached position 
     that is acceptable to return. 
     If set to 0, it means that the device cannot use a cached position and must attempt to retrieve 
     the real current position. If set to Infinity the device must return a cached position regardless of its age. 
     Default: 0
     */
    maximumAge: 0,
    /**
     * Is a positive long value representing the maximum length of time (in milliseconds) the device
     * is allowed to take in order to return a position.
     * NUmber, 1000 sekunda
     * jak długo jesteśmy w stanie czekać na pozycję
     * domyslnie czekamy do skutku, w nieskończoność Infinity
     */
    timeout: Infinity,
  };

  return new Promise((resolve, reject) => {
    if (!hasGeolocationApi()) {
      const error = {
        code: 100,
        message: "Brak obsługi usługi geopozycjonowania",
      };
      reject(error);
      return;
    }
    //--------------------
    const successCallback = (position) => {
      //position: GeolocationPosition
      /**
       * interface GeolocationPosition {
       * readonly coords: GeolocationCoordinates;
       * readonly timestamp: number;
       * }
       */
      resolve(position);
    };
    //--------------------
    const errorCallback = (positionError) => {
      //(positionError: GeolocationPositionError)
      /**
       * interface GeolocationPositionError {
          readonly code: number;
          readonly message: string;
          readonly PERMISSION_DENIED: number;
          readonly POSITION_UNAVAILABLE: number;
          readonly TIMEOUT: number;
         }
       */
      reject(positionError);
    };

    /**
     *  watchPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): number;
     */
    const watchId = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );
  });
};
//-------------------------------------------------------------

/**
 *
 * @param {*} watchId
 * anulowanie watchPosition
 */
const clearWatch = (watchId) => {
  navigator.geolocation.clearWatch(watchId);
};

/**
 * 
 * If the position data changes
 * 
  function success(position) {
  doSomething(position.coords.latitude, position.coords.longitude);
}

function error(err) {
  alert('Sorry, no position available.');
  alert(`ERROR(${error.code}): ${error.message}`);
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

const watchID = navigator.geolocation.watchPosition(success, error, options);

.....
navigator.geolocation.clearWatch(watchID);


To keep receiving HTML geolocation data in regular intervals, use the watchPosition() method. 
It returns the updated position of a user when it changes or when a more accurate location technique can be used

--------------------------------------------
<script>
var watchId = -1;

function error(err) {
        console.warn(err.message);
}

function success(pos) {
  alert(`latitude: ${pos.coords.latitude}
  \n longitude: ${pos.coords.longitude}
  \n accuracy: ${pos.coords.accuracy}`);
}

function watchPosition() {
  if (navigator.geolocation) {
       watchId = navigator.geolocation.watchPosition(success);
  }
}
      
function stopWatching() {
  if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
  }
}
</script>
<body>
  <button onclick="watchPosition()">
    Watch My Position!
  </button>
  <button onclick="stopWatching()">
    Stop Watching
  </button>
</body>

 */

const formatPosition = (position) => {
  /**
 *     readonly accuracy: number;
    readonly altitude: number | null;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number | null;

    //message => JSON.stringify(position) //stringify nie działa wgłąb prototype
 */
  const text = `
timestamp: ${new Date(position.timestamp).toLocaleString()}
coords = {
  accuracy: ${position.coords.accuracy}m
​​  altitude: ${position.coords.altitude}
​​  altitudeAccuracy: ${position.coords.altitudeAccuracy}
​​  heading: ${position.coords.heading}
​​  latitude: ${position.coords.latitude}
​​  longitude: ${position.coords.longitude}
​​  speed: ${position.coords.speed}
}  
`;
  return text;
};

const formatPositionError = (positionError) => {
  /**
   *        * interface GeolocationPositionError {
          readonly code: number;
          readonly message: string;
          readonly PERMISSION_DENIED: number;
          readonly POSITION_UNAVAILABLE: number;
          readonly TIMEOUT: number;
   */
  const text = `
code: ${positionError.code}
message: ${positionError.message}
`;
  return text;
};

export {
  hasGeolocationApi,
  getCurrentPosition,
  watchPosition,
  clearWatch,
  formatPosition,
  formatPositionError,
};
