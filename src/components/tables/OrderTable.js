import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import axios from '../../config/axios';

const PAGE_SIZE = 10;
// KANKA BUNUN SHOW VE STOCK SIKINTILI
export default function OrderTable(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/logistic/order/list")
            let orders = res.data
            orders.map(async (order)=>{
                let data = {
                    customer_id: order.customer_id
                }
                const res1 = await axios.post("/logistic/customer/one",data)
                order.customer_name = res1.data.name
                data = {
                    country_id: res1.data.country_id
                }
                const res2 = await axios.post("/logistic/country/one",data)
                order.country_name= res2.data.name
                data = {
                    product_id: order.product_id
                }
                const res3 = await axios.post("/logistic/product/one",data)
                order.product_name= res3.data.name
            })
            if (res)
                setRecords(orders.slice(0, PAGE_SIZE))
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
                accessor: 'customer_name',
                title: 'Customer Name',
                textAlignment: 'center'
            },
            { 
                accessor: 'product_name',
                title: 'Product Name',
                textAlignment: 'center'
            },
            { 
                accessor: 'country_name',
                title: 'Country',
                textAlignment: 'center'
            },
            {
                accessor: 'amount',
                title: 'Amount',
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

