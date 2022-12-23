import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import axios from '../../config/axios';

const PAGE_SIZE = 5;
export default function CountryDistanceTable(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = {
                country_id: props.country_id
            }
            const res = await axios.post("/logistic/country_distance/list",data)
            if (res) {
                console.log(res.data)
                setRecords(res.data.slice(0, PAGE_SIZE))
            }
                
        }
        fetchData();
      }, []);

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(records.slice(from, to));
      }, [page]);
    

    return (
        <DataTable className='w-full'
            withBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            horizontalSpacing="lg"
            // provide data
            records={records}
            // define columns
            columns={[
            {
                accessor: 'id',
                // this column has a custom title
                title: '#',
                // right-align column
                textAlignment: 'center',
                width: 75
            },
            { 
                accessor: 'country_name',
                title: 'Country Name',
                textAlignment: 'center'
            },
            { 
                accessor: 'distance',
                title: 'Distance',
                textAlignment: 'center'
            },
            { 
                accessor: 'duty_fee',
                title: 'Duty Fee',
                textAlignment: 'center'
            },
            ]}

            totalRecords={records.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
        />
        );
    
  
}

