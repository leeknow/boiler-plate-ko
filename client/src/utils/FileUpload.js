import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload(props) {
    const [Images, setImages] = useState([]);
    const dropHandler = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        };
        formData.append("file", files[0]);
        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.filePath]);
                    props.refreshFunction([...Images, response.data.filePath]);
                }
                else {
                    alert("파일을 저장하는데 실패했습니다.");
                }
            })
    };
    const deleteHandler = (image) => {
        let newImages = [...Images]
            .slice()
            .splice(Images.indexOf(image), 1);
        
        setImages(newImages);

        props
            .refreshFunction(newImages);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* 이미지 올리는 곳(+) **/}
            <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
                    <div
                        style={{ 
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{fontSize: '3rem'}}/>
                </div>
            )}
            </Dropzone>
            {/* 이미지 보여주는 곳 **/}
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

FileUpload.propTypes = {

}

export default FileUpload

