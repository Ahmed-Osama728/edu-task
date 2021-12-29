import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

const Sort = ({ currentPage, resultsPerPage, handleResults }) => {
  const [sort, setSort] = useState({
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
          sort,
          config
        );
        handleResults(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResult();
  }, [currentPage, resultsPerPage, sort]);

  return (
    <Dropdown>
      <div className="dropdown">
        <Dropdown.Toggle className="dropbtn">Sort title</Dropdown.Toggle>
      </div>

      <Dropdown.Menu>
        <Dropdown.Item
          href="#"
          onClick={() =>
            setSort({
              page: currentPage,
              perPage: resultsPerPage,
              sortBy: { field: 'title', direction: 'asc' }
            })
          }
        >
          Ascending
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={() =>
            setSort({
              page: currentPage,
              perPage: resultsPerPage,
              sortBy: { field: 'title', direction: 'desc' }
            })
          }
        >
          Descending
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sort;
