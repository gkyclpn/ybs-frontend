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
            const res = await axios.get("/logistic/transport_fee/list")
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
            if (res) 
                setRecords(transportFees.slice(0, PAGE_SIZE))
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
        const res = await axios.post("/logistic/transport_fee/destroy",data)
        if (res)
            window.location.href = "/transport-fees"
    }

    const show = (id) => {
        props.setClickedTransportFeeId(id)
        props.setModalTransportFeeShow(true)
    }

    const edit = (id) => {
        props.setClickedTransportFeeId(id)
        props.setModalTransportFeeEdit(true)
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
            {
                accessor: 'actions',
                title: <Text mr="xs">Row actions</Text>,
                textAlignment: 'center',
                width: 150,
                render: (transportFee) => (
                    <Group spacing={4} position="center" noWrap>
                        <ActionIcon color="yellow" onClick={() =>{edit(transportFee.id)} }>
                            <AiOutlineEdit size={16} /> 
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() =>{window.confirm( 'Are you sure?', ) && destroy(transportFee.id)} }>
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

