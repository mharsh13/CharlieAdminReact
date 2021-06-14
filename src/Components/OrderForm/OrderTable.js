import React, { useState, useEffect } from "react";
import { Container, Table, Spinner, Form } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";

const OrderTable = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = projectFirestore
      .collection("Orders")
      .orderBy("Date", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
        setLoading(false);
      });
    return () => unsub();
  }, []);

  return (
    <div>
      <Container style={{ marginLeft: "0px", maxWidth: "100%" }}>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Container fluid>
            <Table bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <Container>Order Id</Container>
                  </th>
                  <th>
                    {" "}
                    <Container>Number of Items</Container>
                  </th>
                  <th>
                    {" "}
                    <Container>Total Amount</Container>
                  </th>
                  <th>
                    <Container>Date</Container>
                  </th>
                  <th>
                    <Container>Status</Container>
                  </th>
                </tr>
              </thead>
              <tbody>
                {docs.map((doc, index) => (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>
                      {" "}
                      <Container>{doc.id}</Container>
                    </td>
                    <td>
                      <Container>{doc.OrderList.length}</Container>
                    </td>
                    <td>
                      <Container>{doc.Total}</Container>
                    </td>
                    <td>
                      <Container>
                        {Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(Date.parse(doc.Date))}
                      </Container>
                    </td>
                    <td>
                      <Container>
                        <Form id="form">
                          <Form.Group controlId="status">
                            <Form.Control
                              as="select"
                              onChange={(event) => {
                                const orderRef = projectFirestore
                                  .collection("Orders")
                                  .doc(doc.id);
                                orderRef.update({
                                  Status: event.currentTarget.value,
                                });
                              }}
                              defaultValue={doc.Status}
                            >
                              <option>Placed</option>
                              <option>Confirmed</option>
                              <option>Delivery</option>
                              <option>Success</option>
                            </Form.Control>
                          </Form.Group>{" "}
                        </Form>
                      </Container>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default OrderTable;
