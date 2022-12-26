import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import axios from '../../config/axios';

const PAGE_SIZE = 10;
//KANKA SHOWA BASINCA KAC STOCK OLDUGNU GOSTEREK BI DE AXIOS MUHABBETI VAR
export default function StoreTable(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/logistic/store/list")
            let stores = res.data
            await Promise.all(stores.map(async (store)=>{
                 const data = {
                     country_id: store.country_id
                 }
                const res1 = await axios.post("/logistic/country/one",data)
                store.country_name = res1.data.name
            }))
            if (res) 
                setRecords(stores.slice(0, PAGE_SIZE))
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
        const res = await axios.post("/logistic/store/destroy",data)
        if (res)
            window.location.href = "/stores"
    }

    const show = (id) => {
        props.setClickedStoreId(id)
        props.setModalStoreShow(true)
    }

    const edit = (id) => {
        props.setClickedStoreId(id)
        props.setModalStoreEdit(true)
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
                accessor: 'country_name',
                title: 'Country Name',
                textAlignment: 'center'
            },
            {
                accessor: 'actions',
                title: <Text mr="xs">Row actions</Text>,
                textAlignment: 'center',
                width: 150,
                render: (store) => (
                    <Group spacing={4} position="center" noWrap>
                        <ActionIcon color="blue">
                            <AiOutlineEye size={16} onClick={() => show(store.id)} /> 
                        </ActionIcon>
                        <ActionIcon color="yellow" onClick={() =>{edit(store.id)} }>
                            <AiOutlineEdit size={16} /> 
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() =>{window.confirm( 'Are you sure?', ) && destroy(store.id)} }>
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

