import React, { useEffect, useRef } from 'react';
import { connect } from 'dva';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '@/components/FooterToolbar';

import 'highlight.js/styles/atom-one-light.css'

import HyperMdEditor from "../../components/Editor";


const FormItem = Form.Item;
const {Option} = Select;

const {TextArea} = Input;


const PageInsertComponent = props => {
  const editorRef = useRef(null);
  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'PageInsert/init',
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = props;
    form.validateFieldsAndScroll((err, values) => {
      const d = { ...values };
      if (!err) {
        d.isPublic = d.isPublic === 'true';
        d.content = editorRef.current.getMdValue();
        dispatch({
          type: 'PageInsert/submit',
          payload: d,
        });

      }
    });
  };


    const { PageInsert, form: { getFieldDecorator}, currentUser } = props;

    return (
      <PageHeaderWrapper
        title="插入文章"
      >
        <Card title="文章属性" style={{ marginBottom: 24 }}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col sm={5}>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入文章名称' }],
                  })(
                    <Input
                      placeholder="请输入文章名称"
                    />)}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="Author">
                  {getFieldDecorator('author', {
                    initialValue: currentUser.name,
                    rules: [{ required: true, message: '请输入author' }],
                  })(
                    <Input
                      placeholder="请输入author"
                      disabled
                    />)}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="发表地点">
                  {getFieldDecorator('site', {
                    initialValue: '江苏南京',
                    rules: [{ required: true, message: '请输入发表地点' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="是否公开">
                  {getFieldDecorator('isPublic', {
                    initialValue: 'true',
                    rules: [{ required: true, message: '是否公开' }],
                  })(
                    <Select>
                      <Option value="true">公开</Option>
                      <Option value="false">不公开</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row gutter={16}>
              <Col sm={5}>
                <Form.Item label="logo">
                  {getFieldDecorator('logoUrl', {
                    initialValue: '',
                    rules: [{ required: true, message: '请输入logo地址' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入logo地址"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col sm={5} offset={1}>
                <Form.Item label="url">
                  {getFieldDecorator('url', {
                    initialValue: '',
                    rules: [{ required: true, message: '请输入url地址' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入url地址"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24}>
                <FormItem label="总结">
                  {getFieldDecorator('summary', {
                    initialValue: '',
                    rules: [
                      {
                        // required: true,
                        message: 'summary',
                      },
                    ],
                  })(
                    <TextArea
                      style={{ minHeight: 64, width: '100%' }}
                      placeholder="总结"
                      rows={6}
                      cols={24}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="文章正文">
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col xl={24} lg={24} md={24} sm={24}>
                <FormItem label="">
                  <HyperMdEditor
                    EditorRef={editorRef}
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <FooterToolbar>
          <Button type="primary" htmlType="submit" block onClick={handleSubmit}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>

    );

}


export default connect(({PageInsert, loading, user}) => ({
  PageInsert,
  currentUser: user.currentUser,
  loading: loading.effects['PageInsert/init'],
}))(Form.create({ })(PageInsertComponent));

