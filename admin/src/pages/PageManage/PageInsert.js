import React, {useEffect, useRef} from 'react';
import {connect} from 'dva';
import {Button, Card, Col, Form, Input, Row} from 'antd';

import {PageHeaderWrapper} from '@ant-design/pro-layout';
import FooterToolbar from '@/components/FooterToolbar';

import 'highlight.js/styles/atom-one-light.css'

import HyperMdEditor from "../../components/Editor";


const FormItem = Form.Item;


const PageInsertComponent = props => {
  const editorRef = useRef(null);
  useEffect(() => {
    const {dispatch} = props;
    dispatch({
      type: 'PageInsert/init',
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const {dispatch, form} = props;
    form.validateFieldsAndScroll((err, values) => {
      const d = {...values};
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


  const {PageInsert, form: {getFieldDecorator}, currentUser} = props;

  return (
    <PageHeaderWrapper title="插入文章">
      <Card title="文章属性" style={{marginBottom: 24}}>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col sm={5}>
              <Form.Item label="logo">
                {getFieldDecorator('logoUrl', {
                  initialValue: '',
                  rules: [{required: true, message: '请输入logo地址'}],
                })(
                  <Input
                    style={{width: '100%'}}
                    placeholder="请输入logo地址"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={5} offset={1}>
              <Form.Item label="url">
                {getFieldDecorator('url', {
                  initialValue: '',
                  rules: [{required: true, message: '请输入url地址'}],
                })(
                  <Input
                    style={{width: '100%'}}
                    placeholder="请输入url地址"
                  />,
                )}
              </Form.Item>
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
}))(Form.create({})(PageInsertComponent));

