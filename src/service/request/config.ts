let BASE_URL = "";
let BASE_NAME = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:8000/";
  // BASE_URL = "/api";
  BASE_NAME = "yanwujie_dev";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://yanwujie.org/prod";
  BASE_NAME = "yanwujie_prod";
} else {
  BASE_URL = "http://yanwujie.org/test";
  BASE_NAME = "yanwujie_test";
}

export { BASE_URL, BASE_NAME, TIME_OUT };
