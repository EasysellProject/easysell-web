import React, { CSSProperties, ReactNode } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import SimpleText from "../text/simple-text"

interface DropDownData{
    value: string,
    text: string,
    key: string
}

interface DropDownProps {
    data: DropDownData[],
    value: string,
    label: string,
    onChange: (e:any) => void,
    DropDownStyle?: CSSProperties,
    className?:string,
    InputLabel_id?:string,
    Select_id?:string,
    Select_LabelId?:string,
}

function DropDown(props:DropDownProps):JSX.Element{
    const { data, value, label, onChange, DropDownStyle, className, InputLabel_id, Select_id, Select_LabelId } = props;
    return(
        <FormControl variant="filled" className={className} style={DropDownStyle}>
            <InputLabel id={InputLabel_id}><SimpleText textID={label} additionalStyle={{color:"black", fontSize:12}}/></InputLabel>
            <Select
            style={{}}
            labelId={Select_LabelId}
            id={Select_id}
            value={value}
            onChange={onChange}
            label={label}
            >
            {data.map((dataItem)=>{
                return(
                    <MenuItem key={dataItem.key} value={dataItem.value}><SimpleText textID={dataItem.text} additionalStyle={{color:"black", fontSize:12}}/></MenuItem>
                )
            })}
            </Select>
        </FormControl>
    )
}
export default DropDown