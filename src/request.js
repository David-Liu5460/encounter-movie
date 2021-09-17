import axios from "axios";

/**
 * @method 请求类目list
 */
export const ListEventGroup = async () => {
  // const result = await axios.request(
  //   "https://data.alibaba.com//json/productAdviser/subscribe/getMemberList",
  //   {
  //     method: "GET"
  //   }
  // );

  const result = [
    {
      eventGroupId: "111",
      eventGroupName: "运动电影",
    },
    {
      eventGroupId: "112",
      eventGroupName: "情感电影",
    },
    {
      eventGroupId: "113",
      eventGroupName: "动作电影",
    },
  ];

  return result;
};

/**
 * @method 请求类目下Event
 */
export const QueryEventGroup = async (params) => {
  // const result = await axios.request(
  //   "http://30.4.168.78:8080/QueryEventGroup/1/1",
  //   {
  //     method: "GET",
  //     // params: {
  //     //   userId: 1,
  //     //   groupId: 2
  //     // }
  //   }
  // );
  // debugger

  const result = {
    "eventGroupId": "",
    "eventGroupName": "",
    "events": [
      {
        "eventId": 12,
        "eventName": "泰坦尼克号",
        "startTime": "2021-9-10",
        "endTime": "2021-9-12",
        "totalUserNumeber": "60",
        "userNumber": "30",
        "joined": false,
        "expireTime": "2021-9-21",
        "address": "杭州市滨江区阿里巴巴",
        "pic":  "https://img.alicdn.com/imgextra/i2/O1CN01B09kPj1aEWvlHWGZi_!!6000000003298-2-tps-1244-610.png"
      },
      {
        "eventId": 13,
        "eventName": "泰坦尼克号",
        "startTime": "2021-9-10",
        "endTime": "2021-9-12",
        "joined": true,
        "totalUserNumeber": "60",
        "userNumber": "30",
        "expireTime": "2021-9-21",
        "address": "杭州市滨江区阿里巴巴",
        "pic":  "https://img.alicdn.com/imgextra/i2/O1CN01B09kPj1aEWvlHWGZi_!!6000000003298-2-tps-1244-610.png"
      },
      {
        "eventId": 14,
        "eventName": "泰坦尼克号",
        "joined": true,
        "startTime": "2021-9-10",
        "endTime": "2021-9-12",
        "totalUserNumeber": "60",
        "userNumber": "30",
        "expireTime": "2021-9-21",
        "address": "杭州市滨江区阿里巴巴",
        "pic":  "https://img.alicdn.com/imgextra/i2/O1CN01B09kPj1aEWvlHWGZi_!!6000000003298-2-tps-1244-610.png"
      },
      {
        "eventId": 15,
        "eventName": "泰坦尼克号",
        "startTime": "2021-9-10",
        "endTime": "2021-9-12",
        "joined": true,
        "totalUserNumeber": "60",
        "userNumber": "30",
        "expireTime": "2021-9-21",
        "address": "杭州市滨江区阿里巴巴",
        "pic":  "https://img.alicdn.com/imgextra/i2/O1CN01B09kPj1aEWvlHWGZi_!!6000000003298-2-tps-1244-610.png"
      },
      {
        "eventId": 15,
        "eventName": "泰坦尼克号",
        "startTime": "2021-9-10",
        "endTime": "2021-9-12",
        "joined": true,
        "totalUserNumeber": "60",
        "userNumber": "30",
        "expireTime": "2021-9-21",
        "address": "杭州市滨江区阿里巴巴",
        "pic":  "https://img.alicdn.com/imgextra/i2/O1CN01B09kPj1aEWvlHWGZi_!!6000000003298-2-tps-1244-610.png"
      }
    ]
  };

  return result;
};

/**
 * @method 新建event
 */
export const createEvent = async (params) => {
  // {
  //   "movieId": "1",
  //   "time":"",
  //   "evnetGroupId":"",
  //   "expireTime":""
  // }
  // const result = await puck.request(
  //   "https://data.alibaba.com//json/productAdviser/subscribe/getMemberList",
  //   {
  //     method: "GET"
  //   }
  // );

  const result = {
    "eventId":"",
    "success": true
  }

  return result;
};

/**
 * @method 请求list下拉列表
 */
export const listMovies = async (params) => {
  // const result = await axios.request(
  //   "http://30.4.168.113:8080/movies/list",
  //   {
  //     method: "GET",
  //     params
  //   }
  // );

  const result = [
    {
      "movieId":"123",
      "movieName":"泰坦尼克号",
      "pic":"",
      "description":""
    },
    {
      "movieId":"123",
      "movieName": "海王",
      "pic":"",
      "description":""
    },
    {
      "movieId":"123",
      "movieName":"星际穿越",
      "pic":"",
      "description":""
    },
    {
      "movieId":"123",
      "movieName":"霸王别姬",
      "pic":"",
      "description":""
    }
  ]
  // debugger

  return result;
};

/**
 * @method 加入众筹
 */
export const joinEvent = async () => {
  // const result = await axios.request(
  //   "http://30.4.160.93:8080/joinevent?userId=1&eventId=1",
  //   {
  //     method: "GET"
  //   }
  // );

  const result = {
    success: true
  }

  return result;
};

/**
 * @method 取消众筹
 */
export const quitEvent = async () => {
  // const result = await axios.request(
  //   "http://30.4.160.113:8080/quitEvent?eventId=1&userId=2",
  //   {
  //     method: "GET"
  //   }
  // );

  const result = {
    success: true
  }

  return result;
};

