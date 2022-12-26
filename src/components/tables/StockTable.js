import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import axios from '../../config/axios';

const PAGE_SIZE = 10;
// KANKA BUNUN SHOW VE STOCK SIKINTILI
export default function StockTable(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/logistic/stock/list")
            let stocks = res.data
            await Promise.all(stocks.map(async (stock)=>{
                let data = {
                    product_id: stock.product_id
                }
                const res1 = await axios.post("/logistic/product/one",data)
                stock.product_name = res1.data.name
                data = {
                    store_id: stock.store_id
                }
                const res2 = await axios.post("/logistic/store/one",data)
                stock.store_name = res2.data.name
            }))
            if (res)
                setRecords(stocks.slice(0, PAGE_SIZE))
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
        const res = await axios.post("/logistic/stock/destroy",data)
        if (res)
            window.location.href = "/stocks"
    }

    const edit = (id) => {
        props.setClickedStockId(id)
        props.setModalStockEdit(true)
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
                accessor: 'product_name',
                title: 'Product Name',
                textAlignment: 'center'
            },
            { 
                accessor: 'store_name',
                title: 'Store Name',
                textAlignment: 'center'
            },
            {
                accessor: 'stock',
                title: 'Stock',
                textAlignment: 'center'
            },
            {
                accessor: 'actions',
                title: <Text mr="xs">Row actions</Text>,
                textAlignment: 'center',
                width: 150,
                render: (stock) => (
                    <Group spacing={4} position="center" noWrap>
                        <ActionIcon color="yellow" onClick={() =>{edit(stock.id)} }>
                            <AiOutlineEdit size={16} /> 
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() =>{window.confirm( 'Are you sure?', ) && destroy(stock.id)} }>
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

