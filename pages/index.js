import React, { useEffect, useState, useRef } from 'react'
import dynamic from "next/dynamic";
import { Table, InputGroup, FormControl, Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
const Chart = dynamic(
  () => import("../component/Chart"),
  { ssr: false }
);

const Index = () => {

  const { locale } = useRouter()

  const langTH = {
    hello: 'สวัสดี'
  }
  const langEN = {
    hello: 'Hello'
  }

  const t = locale == 'th' ? langTH : langEN

  const fixedRef = useRef()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
  }, [])

  return (
    <Container fluid={true}>
      {/* <Spin spinning={loading}> */}

      <Row>
        <Col className="py-2" md={{ span: 8, offset: 2, }}>
          <Card>
            <Card.Body>
              {/* <Card.Title></Card.Title> */}
              <Card.Text>
                {t.hello} ผู้ใช้
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="py-2" md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Label className="select">เลือกช่วงวันที่ต้องการ</Form.Label>
                <InputGroup className="index-input-datarange mb-3">
                  <FormControl type="date" name="datetime-start" placeholder="yyyy-mm-dd" />
                  <InputGroup.Prepend className="input-group-addon">
                    <InputGroup.Text>ถึง</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type="date" name="datetime-end" placeholder="yyyy-mm-dd" />
                  <Button className="">แสดงข้อมูล</Button>
                </InputGroup>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col className="py-2" md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <div className="index-map">
                <Chart />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col className="py-2" md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <div className="index-top-ten">

              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col className="py-2" md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body style={{ overflowX: 'scroll' }}>
              <Table striped hover>
                <thead ref={fixedRef}>
                  <tr className="table-success">
                    <th>รหัส Tracking Code</th>
                    <th>รหัสติดตามพัสดุจากขนส่ง</th>
                    <th>ที่อยู่ปลายทาง</th>
                    <th>วันที่จัดส่ง</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="checkbox" /></td>
                    <td>Address</td>
                    <td>Address</td>
                    <td>Address</td>
                    <td>Address</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox" /></td>
                    <td>Address</td>
                    <td>Address</td>
                    <td>Address</td>
                    <td>Address</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox" /></td>
                    <td>Address</td>
                    <td>Address</td>
                    <td>Address</td>
                    <td>Address</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* </Spin> */}
    </Container>
  )
}

export default Index
