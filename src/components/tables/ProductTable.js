import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import axios from '../../config/axios';

const PAGE_SIZE = 10;
// KANKA BUNUN SHOW VE STOCK SIKINTILI
export default function StoreProduct(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/logistic/product/list")
            let products = res.data
            await Promise.all(products.map(async (product)=>{
                const data = {
                    product_id: product.id
                }
                const res1 = await axios.post("/logistic/stock/ones",data)
                let count = 0
                res1.data.map((product) => {
                    count += product.stock
                })
                product.stock = count
            }))
            if (res)
                setRecords(products.slice(0, PAGE_SIZE))
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
        const res = await axios.post("/logistic/product/destroy",data)
        if (res)
            window.location.href = "/products"
    }

    const show = (id) => {
        props.setClickedProductId(id)
        props.setModalProductShow(true)
    }

    const edit = (id) => {
        props.setClickedProductId(id)
        props.setModalProductEdit(true)
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
                accessor: 'stock',
                title: 'Stock',
                textAlignment: 'center'
            },
            {
                accessor: 'actions',
                title: <Text mr="xs">Row actions</Text>,
                textAlignment: 'center',
                width: 150,
                render: (product) => (
                    <Group spacing={4} position="center" noWrap>
                        <ActionIcon color="blue">
                            <AiOutlineEye size={16} onClick={() => show(product.id)} /> 
                        </ActionIcon>
                        <ActionIcon color="yellow" onClick={() =>{edit(product.id)} }>
                            <AiOutlineEdit size={16} /> 
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() =>{window.confirm( 'Are you sure?', ) && destroy(product.id)} }>
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

