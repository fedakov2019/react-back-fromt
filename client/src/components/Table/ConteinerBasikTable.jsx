import React, { useState,useMemo } from "react";
import { BasicTable } from "./BasicTable";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ExitIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';


import MOCK_DATA from './MOCK_DATA.json';


const ConteinerBasikTable=()=>{
 
    const datas = useMemo(() => MOCK_DATA,[MOCK_DATA])
    const [data,setData]=useState(datas)
   
    const columns=[
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'First Name',
            accessor: 'first_name'
        },
        {
            Header: 'Last Name',
            accessor:'last_name',
            editEnable: true,
        },
        {
            Header: 'Email',
            accessor:'email',
            editEnable: true,
        },
        {
            Header: 'Gender',
            accessor:'gender'
        },
        {
            Header: 'Date of Birth',
            accessor:'date_of_birth'
        },
        {
            Header: 'Contry',
            accessor:'contry'
        },
        {
            Header: 'Age',
            accessor:'age'
        },
        {
            Header: 'Phone',
            accessor:'phone'
        },
        {
            Header: "Actions",
            id: "actions",
            disableSortBy: true,
            Cell: ({ row, column, cell }) =>
              row.original.isEditing ? (
                <>
                  <Button   variant="contained"
        color="primary"
        size="small"
       
        startIcon={<SaveIcon />}
                  
                  
                  
                  onClick={() => handleButtonClick("save", row.original)}>
                    Save
                  </Button>
                  <Button 
                    variant="contained"
                    color="primary"
                    size="small"
                  
                    startIcon={<ExitIcon />}
                  
                  
                  onClick={() => handleButtonClick("cancel", row.original)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained"
                color="secondary"
             
                size="small"
                startIcon={<EditIcon />}
                 onClick={() => handleButtonClick("edit", row.original)}>
                  Edit
                </Button>
              ),
          },
        
        
        ]
        const handleInputChange = (event, row, columnId) => {
            const newData = data.map((rowData) => {
              if (rowData.id === row.original.id) {
                return { ...rowData, [columnId]: event.target.value };
              }
              return rowData;
            });
            setData(newData);
          }
    

    const handleButtonClick = (action, row) => {
        const newData = data.map((rowData) => {
          if (rowData.id === row.id) {
            if (action === "edit") {
              return { ...rowData, isEditing: true, prevData: { ...rowData } };
            } else if (action === "cancel") {
              return { ...rowData, isEditing: false, ...rowData.prevData };
            } else if (action === "save") {
              const { prevData, ...updatedRowData } = rowData;
              return { ...updatedRowData, isEditing: false };
            }
          }
          return rowData;
        });
        setData(newData);
    }
      return (
        < BasicTable columns={columns}  data={data} handleInputChange={handleInputChange} />
      )
}
export default ConteinerBasikTable;