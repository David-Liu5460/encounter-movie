import React, { PureComponent } from 'react';
import { 
  ListEventGroup,  
  QueryEventGroup,
  createEvent,
  listMovies,
  joinEvent,
  quitEvent
} from '../../request';
import { Tabs, Button, Modal, Form, Select, Input, DatePicker, message, Card } from 'antd';
import data2key from '../../utils/data2key'
import './index.scss';

const { TabPane } = Tabs;

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

  handleTabClick() {
    console.log("=======")
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
    console.log(joinedArr, 'lmmm================12');
    return (
      <div className="home-page">
        <Tabs 
          // defaultActiveKey="111" 
          // type="card"
          onTabClick={() => { this.handleTabClick() } }
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
                <TabPane tab={item.eventGroupName} key={item.evenGroupId}>
                  {/* {item.eventGroupName} */}
                  <Button type="primary" onClick={this.handleCreateEvent.bind(this)}>新建</Button>
                  {
                    (movieList || []).map(item => {

                      return (
                        <Card key={item.eventId}>
                          <div>
                            <span>电影</span>
                            <span>{item.eventName}</span>
                            <span>地址</span> 
                            <span>{item.address}</span>
                            <span>已众筹人数</span>
                            <span>{item.userNumber}/{item.totalUserNumeber}</span>
                          </div>
                          <div>
                            <span>开始时间</span>
                            <span>{item.startTime}</span>
                            <span>结束时间</span>
                            <span>{item.endTime}</span>
                            <span>过期时间</span>
                            <span>{item.expireTime}</span>
                          </div>
                          <img src={item.pic} className={"home-page-img"} />
                          <div>
                            { !joinedArr.includes(item.eventId) ? <Button type="default" onClick={() => { this.handleJoin(item.eventId) }}>加入</Button> 
                            : <Button onClick={ () =>  this.handleBackUp(item.eventId) }>退出</Button>} 
                          </div>
                        </Card>)
                      })
                  }
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

