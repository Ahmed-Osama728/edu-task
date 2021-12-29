import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const Filter = ({ currentPage, resultsPerPage, handleResults }) => {
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    page: currentPage,
    perPage: resultsPerPage
  });

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
          filter,
          config
        );
        handleResults(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResult();
  }, [currentPage, resultsPerPage, filter]);

  return (
    <Dropdown>
      <div className="dropdown">
        <Dropdown.Toggle className="dropbtn">Filter By status</Dropdown.Toggle>
      </div>

      <Dropdown.Menu>
        <Dropdown.Item
          href="#"
          onClick={() =>
            setFilter({
              page: currentPage,
              perPage: resultsPerPage,
              filters: [{ status: 'open' }]
            })
          }
        >
          Open
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={() =>
            setFilter({
              page: currentPage,
              perPage: resultsPerPage,
              filters: [{ status: 'closed' }]
            })
          }
        >
          Closed
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Filter;
