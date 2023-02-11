import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Key(props) {
    const [option,setoption]=useState(1);
    const handleChangeoption=(event)=>{
        setoption(event.target.value);
        props.changeMatch(props.idx,event.target.value)
    }
    const handleDelete=()=>{
        props.handleRemoveKey(props.idx);
    }
    return (
        <div className='w-fit h-fit border-box p-4 box-border bg-slate-100 rounded-md flex flex-col justify-start gap-4'>
            <div className='w-full flex justify-end cursor-pointer'>
                <HighlightOffIcon onClick={handleDelete}/>
            </div>
            <Box sx={{ minWidth: "250px"}}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.keyName}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={option}
                    label="key"
                    onChange={handleChangeoption}
                    style={{borderRadius:"0px"}}
                >
                    <MenuItem value={1}>Full</MenuItem>
                    <MenuItem value={2}>Partial</MenuItem>
                </Select>
                </FormControl>
            </Box> 
        </div>
    );
}

export default Key;