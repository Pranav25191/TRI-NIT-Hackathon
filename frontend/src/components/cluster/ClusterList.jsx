import { ArrowDownward } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import ClusterTable from './ClusterTable';

function ClusterList(props) {
    const [showTable,setShowTable]=useState(false);
    return (
        <div className='w-full flex  flex-col justify-center items-center bg-zinc-50'>
            <div className='w-full flex p-5 shadow-lg justify-between'>
                <p className='text-2xl text-gray'>Cluster - {parseInt(props.clusterId)+1}</p>
                <Button  onClick={()=>{setShowTable(prevState => !prevState)}} endIcon={<ArrowDownward/>} style={{color:"black"}}>View Documents</Button>
            </div>
            {showTable && <ClusterTable clusterData={props.clusterData}/>}
        </div>

    );
}

export default ClusterList;