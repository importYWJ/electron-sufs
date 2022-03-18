import axios from "axios";

// axios的实例
// axios.request({
//   method: 'GET'
// })

// axios的配置选项
axios.defaults.baseURL = "https://httpbin.org";
axios.defaults.timeout = 10000;
// axios.defaults.headers = {}

// 模拟get请求
axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
  console.log(res.data);
});

// get请求, 并且传入参数
axios
  .get("/get", {
    params: {
      name: "ywj",
    },
  })
  .then((res) => {
    console.log(res.data);
  });

// new Promise<string>((resolve, reject) => {
//   resolve('1234')
// }).then((res) => {
//   console.log(res.length)
// })

// axios.all -> 多个请求，一起返回
axios
  .all([
    axios.get("/get", { params: { name: "ywj", age: 18 } }),
    axios.post("./post", { data: { name: "ywj", age: 30 } }),
  ])
  .then((res) => {
    console.log(res[0].data);
    console.log(res[1].data);
  });

// 6. axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    config.url = "/post";
    // 想做的一些操作
    // 1. 给请求添加token
    // 2. isLoading动画
    console.log("请求成功拦截");
    return config;
  },
  (err) => {
    console.log("请求发送错误");
    return err;
  }
);
// fn1: 数据响应成功(服务器正常的返回数据 20x)
// fn2: 数据响应失败
axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log("服务器响应失败");
    return err;
  }
);
