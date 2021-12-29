import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  Pagination,
  Table,
  Col,
  Row,
  Spinner
} from 'react-bootstrap';
import Filter from '../components/Filter';
import Search from '../components/Search';
import Sort from '../components/Sort';

const HomeScreen = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(1);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        };

        const res = await axios.post(
          'https://stag.api.admin.eduact.me/api/admin/classroom/all',
          { page: currentPage, perPage: resultsPerPage },
          config
        );
        setResults(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResult();
  }, [currentPage, resultsPerPage]);

  // for pagination settings

  let items1 = [];
  let items2 = [];
  for (let number = 1; number <= 17; number++) {
    items1.push(
      <Pagination.Item onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
    items2.push(<a onClick={() => setResultsPerPage(number)}>{number}</a>);
  }

  const handleResults = (newData) => {
    setResults(newData);
  };

  return (
    <div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Classroom Name</th>
              <th>Classroom Type</th>
              <th>Classroom Status</th>
              <th>Classroom Id</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <Row>
                <h3 className="text-center">No Classrooms found...</h3>
              </Row>
            ) : (
              results.map((result) => (
                <tr>
                  <td>{result.category.name}</td>
                  <td>{result.type}</td>
                  <td>{result.status}</td>
                  <td>{result.id}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      <Row>
        <Col>
          <div className="pag">
            <Pagination expand="lg">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
              />
              {items1}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </Pagination>
          </div>
        </Col>
      </Row>
      <Row className="mt-5 mb-8">
        <Col>
          <div className="dropdown">
            <Dropdown.Toggle className="dropbtn">
              Results Per Page
            </Dropdown.Toggle>
            <div className="dropdown-content">{items2}</div>
          </div>
        </Col>
        <Col>
          <Filter
            currentPage={currentPage}
            resultsPerPage={resultsPerPage}
            handleResults={handleResults}
          />
        </Col>
        <Col>
          <Sort
            currentPage={currentPage}
            resultsPerPage={resultsPerPage}
            handleResults={handleResults}
          />
        </Col>
        <Col>
          <Search
            currentPage={currentPage}
            resultsPerPage={resultsPerPage}
            handleResults={handleResults}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
