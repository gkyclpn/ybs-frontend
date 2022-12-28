import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import axios from '../../config/axios';

const PAGE_SIZE = 5;
export default function TransportShowTable(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = {
                transport_id: props.transport_id
            }
            const res = await axios.post("/logistic/transport_fee/ones",data)
            let transportFees = res.data
            await Promise.all(transportFees.map(async (transportFee)=>{
                let data = {
                    store_id: transportFee.store1_id
                }
                const res1 = await axios.post("/logistic/store/one",data)
                data = {
                    store_id: transportFee.store2_id
                }
                const res2 = await axios.post("/logistic/store/one",data)
                data = {
                    transport_id: transportFee.transport_id
                }
                const res3 = await axios.post("/logistic/transport/one",data)
                transportFee.store1_name = res1.data.name
                transportFee.store2_name = res2.data.name
                transportFee.transport_name = res3.data.name
            }))
            if (res) {
                setRecords(transportFees.slice(0, PAGE_SIZE))
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
                accessor: 'transport_name',
                title: 'Transport Name',
                textAlignment: 'center'
            },
            { 
                accessor: 'store1_name',
                title: '1st Store Name',
                textAlignment: 'center'
            },
            { 
                accessor: 'store2_name',
                title: '2nd Store Name',
                textAlignment: 'center'
            },
            { 
                accessor: 'fee',
                title: 'Fee',
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

