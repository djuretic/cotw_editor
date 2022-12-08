import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Button, Row, Col } from 'react-bootstrap'

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onLoadExample: (event: React.MouseEvent) => void,
}

export interface FileInputHandles {
  clear(): void
}

const FileInput = forwardRef<FileInputHandles, FileInputProps>(({onChange, onLoadExample}, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  useImperativeHandle(ref, () => ({
    clear: () => {
      if(fileInputRef.current){
        fileInputRef.current.value = ""
      }
    }
  }))
 
  return (
    <fieldset>
      <legend>Select a savegame file</legend>
      <Row>
        <Col xs={12} md={5}><input ref={fileInputRef} type='file' id='file' accept=".cwg" onChange={onChange} /></Col>
        <Col xs={12} md={1}>or</Col>
        <Col xs={12} md={5}><Button variant="primary" onClick={onLoadExample}>Use example savegame</Button></Col>
      </Row>
      <p className="text-danger">Remember to backup your original savegame file.</p>
    </fieldset>
  )
  
})

export default FileInput