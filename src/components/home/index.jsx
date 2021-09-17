import React, { PureComponent } from 'react';
import { 
  ListEventGroup,  
  QueryEventGroup,
  createEvent,
  listMovies,
  joinEvent,
  quitEvent
} from '../../request';
import { Tabs, Button, Modal, Form, Select, Input, DatePicker, message, Card, Carousel } from 'antd';
import data2key from '../../utils/data2key'
import './index.scss';

const { TabPane } = Tabs;
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  background: '#364d79',
};

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cateList: [],
      movieList: [],
      selectMovies: [],
      currentTabKey: "运动电影",
      isModalVisible: false,
      joinedArr: []
    }
  }

  async componentDidMount () {
    const cateList = await ListEventGroup();
    // debugger
    const resGroup = await QueryEventGroup();
    // debugger
    const selected = await listMovies();
    const joinedArr = [];
    resGroup.events.map(item => {
      if (item.joined) {
        joinedArr.push(item.eventId);
      }
    })
    // console.log(movieList, '==========');
    this.setState({ 
      cateList, 
      movieList: resGroup.events, 
      selectMovies: data2key(selected || []),
      joinedArr 
    });

  }

  handleTabClick(currentTabKey) {
    console.log("=======", currentTabKey)
  }
  handleOk = () => {
    this.setState({
      isModalVisible: false
    })
  }
  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })

  }

  handleCreateEvent = () => {
    this.setState({
      isModalVisible: true
    });
  }
  
  handleSubmit = async (params) => {
    console.log(params);
    const res = await createEvent(params);
    if (res.success) {
      message.success('众筹电影创建成功');
    } else {
      message.error("创建失败");
    }

    this.setState({
      isModalVisible: false
    })
  }

  handleJoin = async (eventId) => {
    const { joinedArr } = this.state;
    // if (joinedArr.indexOf(eventId) > -1) {
    //   // 加入
    // }
    // 加入逻辑
    const newJoined = [...joinedArr, eventId];
    this.setState({
      joinedArr: newJoined
    })
    // const idx = joinedArr.indexOf(eventId); 
    const res = await joinEvent(eventId);
    debugger
    if (res.data.success) {
      message.success("加入成功");
    } else {
      message.error("加入失败");
    }
  }

  handleBackUp = async (eventId) => {
    debugger
    const { joinedArr } = this.state;
    const newJoined = [...joinedArr];
    const idx = joinedArr.indexOf(eventId); 
    newJoined.splice(idx, 1);
    this.setState({ joinedArr: newJoined });

    const res = await quitEvent(eventId);
    if (res.success) {
      message.success("退出成功");
    } else {
      message.error("退出失败");
    }
  }
  render() {
    const { cateList, movieList, isModalVisible, selectMovies, joinedArr } = this.state;
    const { sharedValue } = this.props;
    console.log(cateList, 'lmmm================12');
    return (
      <div className="home-page">
        <div className="home-page-title">
          <img
            className={"title-img"}
            src="https://img.alicdn.com/imgextra/i2/O1CN01ZiKYD11bYyDrQ0AZy_!!6000000003478-2-tps-756-320.png"
            ></img>
          <div className="home-page-desc">
            <span className="home-page-hello">Hello, {sharedValue.username}</span>
            Encounter your movies Here
          </div>  
          {/* <img src="https://img.alicdn.com/imgextra/i2/O1CN01ZiKYD11bYyDrQ0AZy_!!6000000003478-2-tps-756-320.png"></img> */}
        </div>
        <div style={{ width: "600px", height: "200px", margin: "auto"}}>
          <Carousel autoplay width={400} height={200}>
            <div>
              <img 
              style={contentStyle}
              className={"detail-img"}
              src="https://img.alicdn.com/imgextra/i2/O1CN01B09kPj1aEWvlHWGZi_!!6000000003298-2-tps-1244-610.png"
              ></img>
              {/* <img src="https://img.alicdn.com/imgextra/i2/O1CN01B09kPj1aEWvlHWGZi_!!6000000003298-2-tps-1244-610.png"></img> */}
            </div>
            <div>
              <img 
                style={contentStyle}
                className={"detail-img"}
                src="data:image/jpeg;base64,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"
                ></img>
            </div>
            <div>
              <img
               style={contentStyle}
               className={"detail-img"}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv9gvROsDdW4afe7UyLATfOJlrdAVJ7Vd7Cw&usqp=CAU"
              ></img>
            </div>
            <div>
              <img
                style={contentStyle}
                className={"detail-img"}
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6GH9RB4_y1jHTfOQC6luH0ee94t5UCCfk1Q&usqp=CAU"}
              >
              </img>
            </div>
          </Carousel>
        </div>
        <Tabs 
          defaultActiveKey="111" 
          // type="card"
          onTabClick={this.handleTabClick}
          size={'large'}
        >
          {/* <TabPane tab="Card Tab 1" key="1">
            Content of card tab 1
          </TabPane>
          <TabPane tab="Card Tab 2" key="2">
            Content of card tab 2
          </TabPane>
          <TabPane tab="Card Tab 3" key="3">
            Content of card tab 3
          </TabPane> */}
          {
            (cateList || []).map((item, index) => {
              return (
                <TabPane tab={item.eventGroupName} key={`item.evenGroupId${index}`}>
                  {/* {item.eventGroupName} */}
                  <div>
                    <div className={"button"}>
                      一起去众筹看电影吧！
                      <Button type="ghost" onClick={this.handleCreateEvent.bind(this)}>点我创建</Button>
                    </div>
                    <div className="page-body">
                      {
                        (movieList || []).map(item => {
                          return (
                            <div key={item.eventId} className="page-body-item">
                              <div>
                                <div className="item-box item-name">
                                  电影 : {item.eventName}
                                  { !joinedArr.includes(item.eventId) ? <Button className="button" type="default" onClick={() => { this.handleJoin(item.eventId) }}>加入</Button> 
                                : <Button className={"button"} onClick={ () =>  this.handleBackUp(item.eventId) }>退出</Button>} 
                                </div>
                                <div className="item-box">
                                  地址 : {item.address}
                                </div>
                                <div className="item-box">已众筹人数 : {item.userNumber}/{item.totalUserNumeber}</div>
                              </div>
                              <div className="item-box">
                                <span>开始时间: </span>
                                <span className={"end-time"}>{item.startTime}</span>
                                <span>结束时间: </span>
                                <span>{item.endTime}</span>
                                {/* <span>过期时间</span>
                                <span>{item.expireTime}</span> */}
                              </div>
                              {/* <div>
                                
                              </div> */}
                              <img src={item.pic} className={"home-page-img"} />
                            </div>)
                          })
                      }
                    </div>
                  </div>
                </TabPane>
              )
            })
          }
        </Tabs>
        <Modal 
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={this.handleSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="movieId"
              name="movieId"
              rules={[
                {
                  required: true,
                  message: 'Please select a movie!',
                },
              ]}
            >
              <Select options={selectMovies}>
                {/* <Select.Option value="demo">Demo</Select.Option> */}
              </Select>
            </Form.Item>

            <Form.Item
              label="startTime"
              name="startTime"
              rules={[
                {
                  required: true,
                  message: 'Please input start time',
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="expireTime"
              name="expireTime"
              rules={[
                {
                  required: true,
                  message: 'Please input expire time',
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="totalUserNumeber"
              name="totalUserNumeber"
              rules={[
                {
                  required: true,
                  message: 'Please input total User Number!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item
              label="totalUserNumeber"
              name="totalUserNumeber"
              rules={[
                {
                  required: true,
                  message: 'Please input total User Number!',
                },
              ]}
            >
              <Input />
            </Form.Item> */}

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" >
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

