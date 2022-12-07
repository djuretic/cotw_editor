// import Modernizr from 'modernizr'
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import {Button, Container, Row, Col, Modal, Alert} from 'react-bootstrap'
import '../assets/css/main.css'
import SavegameParser from './savegameParser'
import {emptySavegame, SavegameDefinition, SpellId, SpellNumber, FieldId} from './constants'

import Spellbook from './components/Spellbook'
import SpellBar from './components/SpellBar'
import CharacterProfile from './components/CharacterProfile'
import OutdatedBrowserWarning from './components/OutdatedBrowserWarning'
import SelectSpellModal from './components/SelectSpellModal'

import './googleAnalytics'

import iconImage from '../assets/icon.png'

const browserSupported = true //TODO Modernizr.typedarrays && Modernizr.xhrresponsetypearraybuffer


interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onLoadExample: (event: React.MouseEvent) => void,
}

interface FileInputHandles {
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

const MainEditor: React.FC<{}> = ({}) => {
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [currentSpellMenuSlot, setCurrentSpellMenuSlot] = useState<number | null>(null)
  const [showSpellModal, setShowSpellModal] = useState(false)
  const [modalText, setModalText] = useState('')
  const [validationMsg, setValidationMsg] = useState('')
  const [savegame, setSavegame] = useState<SavegameDefinition>(emptySavegame())

  const fileInput = React.createRef<FileInputHandles>()

  const informError = (error: Error) => {
    let text = error.message
    if(error instanceof RangeError){
      text = 'The file is not a valid Castle of the Winds savegame.'
    }
    fileInput.current!.clear()
    setShowErrorModal(true)
    setModalText(text)
  }

  function closeErrorModal() {
    setShowErrorModal(false)
  }

  const openSpellModal = (slot: number) => {
    setShowSpellModal(true)
    setCurrentSpellMenuSlot(slot)
  }

  const closeSpellModal = () => {
    setShowSpellModal(false)
    setCurrentSpellMenuSlot(null)
  }

  const handleSpellSelected = (slot: number | null, spellNumber: SpellNumber) => {
    if (slot === null) {
      return
    }
    setSavegame({...savegame, spellBar: savegame.spellBar.map((spell, i) => i === slot ? spellNumber: spell)})
  }

  const savefileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      SavegameParser.parse(e.target.files[0], (state) => setSavegame(state), informError)
    }
  }

  const downloadSavefile = (e: React.MouseEvent) => {
    e.preventDefault();
    var form = document.getElementsByTagName('form')[0]
    if(form.checkValidity()){
      setValidationMsg('')
      SavegameParser.write(savegame)
    } else {
      setValidationMsg('All input fields should contain numbers')
    }
  }

  const handleChange = (attribute: FieldId | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
    if (attribute) {
      // @ts-ignore
      setSavegame({...savegame, [attribute]: event.target.value})
    }
  }

  const handleSpellChange = (spell: SpellId, event: React.ChangeEvent<HTMLInputElement>) => {
    //source: 2nd comment of http://stackoverflow.com/a/18934259
    setSavegame({...savegame, spellBook: { ...savegame.spellBook, [spell]: event.target.value}})
  }

  const isLoaded = () => {
    return !!savegame.level
  }

  const loadExample = () => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', './example.cwg')
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.responseType = 'arraybuffer'
    xhr.onload = () => {
      if (xhr.status === 200) {
        fileInput.current!.clear()
        SavegameParser.parse(xhr.response, (state: SavegameDefinition) => setSavegame(state), informError)
      } else {
        alert('Error loading the example file. Returned status of ' + xhr.status)
      }
    }
    xhr.send()
  }

  return (
    <Container>
      <OutdatedBrowserWarning initialShow={!browserSupported}/>
      <div className="header">
        <h1><img src={iconImage} height="32" width="32" />Castle of the Winds Editor</h1>
        <a href="https://github.com/djuretic/cotw_editor" target="_blank">View on Github</a>
      </div>
      <FileInput ref={fileInput} onChange={savefileSelected} onLoadExample={loadExample}/>
      {
        isLoaded()
        ? (
          <form className="form-horizontal">
            <Row>
              <Col xs={12} md={4}>
                <CharacterProfile
                  str={savegame.str} int={savegame.int} con={savegame.con} dex={savegame.dex}
                  hp={savegame.hp} maxHp={savegame.maxHp}
                  mp={savegame.mp} maxMp={savegame.maxMp}
                  exp={savegame.exp} armorClass={savegame.armorClass} level={savegame.level}
                  bulk={savegame.bulk} maxBulk={savegame.maxBulk} name={savegame.name}
                  weight={savegame.weight} maxWeight={savegame.maxWeight} gender={savegame.gender}
                  handleChange={handleChange}
                  />
              </Col>
              <Col xs={12} md={8}>
                <SpellBar bar={savegame.spellBar} onClick={openSpellModal}/>
                <Spellbook spells={savegame.spellBook} handleChange={handleSpellChange}/>
              </Col>
            </Row>
            <fieldset>
              <legend>Download savegame file</legend>
              { validationMsg !== '' ? <Alert variant="danger">{validationMsg}</Alert> : '' }
              <Button type="submit" variant="primary" disabled={!isLoaded()} onClick={downloadSavefile}>Download savegame</Button>
            </fieldset>
            </form>
        ) : null
      }

      <Modal show={showErrorModal} onHide={closeErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Error reading file: {modalText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeErrorModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <SelectSpellModal
        show={showSpellModal}
        slot={currentSpellMenuSlot}
        value={currentSpellMenuSlot ? savegame.spellBar[currentSpellMenuSlot] : null}
        onSelectSpell={handleSpellSelected}
        onHide={closeSpellModal} />
    </Container>
  )
}

const container = document.getElementById('react-app')
const root = createRoot(container!)
root.render(<MainEditor />)
