import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Key from './Key';
import ClusterList from '../cluster/ClusterList';
import axios from "axios";
import Loader from "../Loader"
function KeySelection(props) {
    const [isLoading,setIsLoading]=React.useState(false);
    const [keysList,setkeysList]=React.useState([])
    React.useEffect(()=>{
        axios.get("http://backend:8000/getkeys").then((res)=>{
            console.log(res.data)
            setkeysList(res.data)
        }).catch((error)=>{
            console.log(error);
        })
    },[])
    const [data,setData]=React.useState(null)
    const [keys, setKeys] = React.useState([]);
    const [selectedKey, setSelectedKey] = React.useState('');
    const handleChange = (event) => {
        setSelectedKey(event.target.value);
    };
    const handleUpdateKeys = (event) => {
        var found=false;
        for (const {key,match} of keys) {
            if(key===selectedKey){
                found=true;
            }
        }
        if(!found){
            setKeys(oldArray => [...oldArray, {"key":selectedKey,"match":1}]);
            console.log(keys);

        }
        else{
            alert("Key already Selected")
        }
        console.log(keys);

    };
    const handleChangematch=(idx,val)=>{
        var newArr=keys;
        newArr[idx].match=val;
        setKeys(newArr);
        console.log(keys);
    }
    const handleRemoveKey=(idx)=>{
        console.log(idx)
        setKeys(keys.filter((item, i) => i !== idx));
        console.log(keys);
    }
    const getClusterData=async ()=>{
        setIsLoading(true);
        try {
            let res=await axios.post("http://backend:8000/cluster",{"result":keys});
            console.log(res.data);
            setData(res.data)
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }
    return (
        <div className='w-full flex flex-col justify-center items-center gap-10 mt-5'>
            <div className='w-[80%] flex flex-col min-h-[300px] h-auto rounded-lg m-auto items-center border-2 justify-center p-5 pt-4 bg-slate-100 shadow-lg'>
                <div className='w-[98%] flex h-auto rounded-lg bg-white flex-col items-center justify-start p-4'>
                    <p className='text-2xl text-gray'> Select The Keys For Clustering</p>
                    <div className='w-full flex justify-center p-4 '>                                
                        <Box sx={{ minWidth: "80%"}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">key</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedKey}
                            label="key"
                            onChange={handleChange}
                            style={{borderRadius:"0px"}}
                            >
                            {
                                keysList.map((key,index)=>{
                                    return(
                                        <MenuItem value={key}>{key}</MenuItem>
                                    )
                                })
                            }

                            </Select>
                        </FormControl>
                        </Box>
                        <Button startIcon={<AddIcon/>} variant="contained" style={{width:"80%",borderRadius:"0px"}} onClick={handleUpdateKeys}>Add</Button>
                    </div>
                </div>
                <div className='w-[98%] flex h-auto rounded-lg bg-white flex-col items-center justify-start p-4'>
                    <p className='text-2xl text-gray'>Selected Keys</p>
                    <div className='w-full flex justify-center p-4 gap-4 flex-wrap'>
                        {
                            keys.map(({key,match},index)=>{
                                return(
                                    <Key keyName={key} idx={index} match={match} changeMatch={handleChangematch} handleRemoveKey={handleRemoveKey}/>
                                );
                            })
                        } 
                        {keys.length===0 && <p className='text-xl text-black'>No clusters have been selected</p>}                                  
                    </div>
                    <div className='w-full flex justify-center'>
                        <Button variant="contained" onClick={getClusterData}> Start Clustering</Button>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <p className='text-2xl text-gray'>Formulated Clusters</p>
            </div>
            {!isLoading && <div className='w-[80%] flex flex-col justify-center items-center gap-4'>
            {data && Object.keys(data).length>=0 && Object.keys(data).map((key)=>{
                return(<ClusterList clusterId={key} clusterData={data[key]}/>);
            })}
            </div>}
            {isLoading && <Loader></Loader>}
            {!data && !isLoading && <p className='text-2xl text-gray'>No clusters to show</p>}
        </div>

    );
}

export default KeySelection;