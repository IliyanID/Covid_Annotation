import React, { useState } from 'react'
import { globalProps } from '../../common_types'
import { API_Export_Tweets } from '../../utils/API/APISettings'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalBody } from 'reactstrap'
import useToggle from '../../hooks/useToggle'

let api:API_Export_Tweets

const ExportOptions = [
    {
        data:'none',
        text:'Export Options'
    },
    {
        data:'validated',
        text:'Export Validated Tweets'
    },
    {
        data:'partial',
        text:'Export Partially Completed Tweets'
    },
    {
        data:'skipped',
        text:'Export Skipped Tweets'
    },
]

const ExportDataType = [
    {
        data:'none',
        text:'Export Data Type'
    },
    {
        data:'csv',
        text:'CSV'
    }
]

const deleteDataType=[
    {
        data:'none',
        text:'Delete Options'
    },
    {
        data:'Validated',
        text:'Delete Validated'
    },
    {
        data:'Unvalidated',
        text:'Delete Unvalidated'
    }
]

export const ConfirmationModal = (props:any)=>{
    let deleteType = deleteDataType[props.deleteIndex].data
    let style={margin:'5px'}
    return <Modal isOpen={props.isOpen}>
        <ModalHeader>Confirm Deleting of {deleteType} Database</ModalHeader>
        <ModalBody style={{margin:'auto'}}>
            <Button 
                color='primary'
                onClick={()=>{ api.CLEAR_DB(deleteType,()=>{
                    props.showMessage(`Succesfully Deleted ${deleteType} Database`,'success')
                    props.toggleModal();
                })}}
                style={style}>
                Confirm
            </Button>
            <Button 
                color='secondary'
                onClick={props.toggleModal}
                style={style}
            >
                Cancel
            </Button>
        </ModalBody>
    </Modal>
}

export const Export = (props:globalProps) =>{
    api = new API_Export_Tweets(props.showMessage)
    const [dropdown,toggleDropdown] = useToggle(false)
    const [deleteDropDown,toggleDeleteDropDown] = useToggle(false)
    const [modalDelete,toggleModalDelete] = useToggle(false)
    const [selectedOption,setSelectedOption] = useState(0)
    const [deletedIndex,setDeleteIndex] = useState(0)
    return <div
        style={{width:'500px',margin:'auto'}}
        className='Export_sections'
    >
        <section>
                <Dropdown isOpen={dropdown} toggle={toggleDropdown}>
                    <DropdownToggle caret
                    style={{minWidth:'300px',float:'right'}}
                    >
                    {ExportOptions[selectedOption].text}
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            ExportOptions.map((item,index)=>{
                                if(index === 0)
                                    return <></>
                                return <DropdownItem
                                        onClick={()=>{setSelectedOption(index)}}
                                        
                                    >
                                    {item.text}
                                </DropdownItem>
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
                <Button color='primary' disabled={selectedOption === 0} style={{marginTop:'0px',float:'left'}} onClick={()=>handleExport(selectedOption)}>Export ㅤTweets</Button>
                </section>
                
                <section>
                <ConfirmationModal isOpen={modalDelete} toggleModal={toggleModalDelete} showMessage={props.showMessage} deleteIndex={deletedIndex}/>
                <Dropdown isOpen={deleteDropDown} toggle={toggleDeleteDropDown}>
                    <DropdownToggle caret
                    style={{minWidth:'300px',float:'right'}}
                    >
                    {deleteDataType[deletedIndex].text}
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            deleteDataType.map((item,index)=>{
                                if(index === 0)
                                    return <></>
                                return <DropdownItem
                                        onClick={()=>{setDeleteIndex(index)}}
                                        
                                    >
                                    {item.text}
                                </DropdownItem>
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
                <Button color='primary' disabled={deletedIndex === 0} style={{marginTop:'0px',float:'left'}} onClick={toggleModalDelete}>Delete Database</Button>

                </section>
            </div>
}

const handleExport = async (selectedOption:number) =>{
    let data = ExportOptions[selectedOption].data
    var fileDownload = require('js-file-download');
    api.API_EXPORT(data,(fileContents)=>{
        const d = new Date();
        let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDay() + 'T' + d.getHours() + "_" + d.getMinutes();
        fileDownload(fileContents,  date + `${data}_Tweets.csv`);  
    })
}

export default Export;