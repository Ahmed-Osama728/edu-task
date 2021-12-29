import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Dropdown, Form } from 'react-bootstrap';

const Search = ({ currentPage, resultsPerPage, handleResults }) => {
  const [inputValue, setInputValue] = useState('');

  const [search, setSearch] = useState({
    page: currentPage,
    perPage: resultsPerPage
  });

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        };

        const res = await axios.post(
          'https://stag.api.admin.eduact.me/api/admin/classroom/all',
          search,
          config
        );
        handleResults(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResult();
  }, [currentPage, resultsPerPage, search]);

  const submitHandler = (e) => {
    e.preventDefault();
    setSearch({
      page: currentPage,
      perPage: resultsPerPage,
      query: inputValue
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search Classroom Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Clasroom Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Form.Group>

      <div className="center">
        <Button
          style={{
            backgroundColor: '#000000'
          }}
          type="submit"
        >
          ok
        </Button>
      </div>
    </Form>
  );
};

export default Search;
