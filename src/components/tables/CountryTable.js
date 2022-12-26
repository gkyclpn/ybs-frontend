import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import axios from '../../config/axios';

const PAGE_SIZE = 10;

export default function CountryTable(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/logistic/country/list")
            if (res) 
                setRecords(res.data.slice(0, PAGE_SIZE))
        }
        fetchData();
      }, []);

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(records.slice(from, to));
      }, [page]);

    const destroy = async (id) => {
        const data = {
            id: id
        }
        const res = await axios.post("/logistic/country/destroy",data)
        if (res)
            window.location.href = "/countries"
    }

    const show = (id) => {
        props.setClickedCountryId(id)
        props.setModalDistanceShow(true)
    }



    return (
        <DataTable className='w-full'
            minHeight={180}
            noRecordsText="No records to show"
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
                accessor: 'name',
                textAlignment: 'center'
            },
            {
                accessor: 'createdAt',
                width: 200,
                // this column has custom cell data rendering
                render: ({ createdAt }) => (
                <Text>
                    {new Date(createdAt).toLocaleString("en-US",{ year: 'numeric', month: 'long', day: 'numeric'})}
                </Text>
                ),
            },
            {
                accessor: 'actions',
                title: <Text mr="xs">Row actions</Text>,
                textAlignment: 'center',
                width: 150,
                render: (country) => (
                    <Group spacing={4} position="center" noWrap>
                        <ActionIcon color="blue" onClick={() => show(country.id)}>
                            <AiOutlineEye size={16} />
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() =>{window.confirm( 'Are you sure?', ) && destroy(country.id)} }>
                            <AiOutlineDelete size={16} />
                        </ActionIcon>
                    </Group>
                ),
                },
            ]}

            totalRecords={records.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
        />
        );
    
  
}

