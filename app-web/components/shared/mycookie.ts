import nookies from "nookies";

export function removeCookie(ctx: any, key: string) {
    const cookies = nookies.get(ctx);
    Object.keys(cookies).map((_key) => {
      if (_key == key) 
      {
          nookies.destroy(ctx, cookies[_key]);
      }
    });
  }
  

export function getCookie(ctx: any, key: string) {
  const cookies = nookies.get(ctx);
  let data=null;
  Object.keys(cookies).map((_key) => {
    if (_key == key) 
    {
      var now = Date.now();
      var expiresIn = parseInt(cookies[_key + "_expiresIn"]);
      if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
      }

      if (expiresIn < now) {
        nookies.destroy(ctx, cookies[_key]);
      } else {
        try {
            data = cookies[_key];
        } catch (e) {
        }
      }
    }
  });
  return data;
}

export function setCookie(
  ctx: any,
  key: string,
  value: string,
  expires: number
) {
  if (expires === undefined || expires === null) {
    expires = 24 * 60 * 60; // default: seconds for 1 day
  } else {
    expires = Math.abs(expires); //make sure it's positive
  }

  var now = Date.now(); //millisecs since epoch time, lets deal only with integer
  var schedule = now + expires * 1000;
  try {
    // Set
    nookies.set(ctx, key, value, {
      maxAge: schedule,
      path: "/",
    });
    nookies.set(ctx, key + "_expiresIn", schedule + "", {
      maxAge: schedule,
      path: "/",
    });
  } catch (e) {
//    //co key
//    const cookies = nookies.get(ctx);
//    let data=null;
//    Object.keys(cookies).map((_key) => {
//      if (_key == key) 
//      {
//          nookies.destroy(ctx, cookies[_key]);
//          nookies.set(ctx, key, value, {
//             maxAge: schedule,
//             path: "/",
//           });
//           nookies.set(ctx, key + "_expiresIn", schedule + "", {
//             maxAge: schedule,
//             path: "/",
//           });
//      }
//    });
  }
  return true;
}
