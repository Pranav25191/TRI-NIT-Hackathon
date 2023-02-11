
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
    typography: {
        fontSize: 22
      },
  },
}));



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function ClusterTable(props) {
    const [rows,setRows]=React.useState(props.clusterData);
    const [columns,setColumns]=React.useState([])

    React.useEffect(()=>{
        var newArr=rows;
        for (let i=0;i<rows.length;i++) {
            newArr[i].id=i;
        }
        setRows(newArr)
        // console.log(props.clusterData);
        var c=[];
        Object.keys(props.clusterData[0]).length>=0 && Object.keys(props.clusterData[0]).map((key)=>{
            c.push({ field:key, headerName: key, width: 250});
        })
        // var half_length = Math.ceil(columns.length / 2);    
        // var leftSide = columns.slice(0,half_length);
        setColumns(c);
        // console.log("row",rows);
    },[])
    // {console.log("col",columns);}
    return (
        <div style={{ height: 400, width: '100%',margin:"auto" }}>
            <StripedDataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }
            />
        </div>
    );
}

export default ClusterTable;