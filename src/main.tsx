import Modernizr from 'modernizr'
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Container, Row, Col, Modal, Alert} from 'react-bootstrap'
import '../assets/css/main.css'
import SavegameParser from './savegame_parser'
import {emptySavegame, SavegameDefinition, SpellId, FieldId} from './constants'

import Spellbook from './components/Spellbook'
import SpellBar from './components/SpellBar'
import CharacterProfile from './components/CharacterProfile'
import OutdatedBrowserWarning from './components/OutdatedBrowserWarning'

import './google_analytics'

import iconImage from '../assets/icon.png'

const browserSupported = Modernizr.typedarrays && Modernizr.xhrresponsetypearraybuffer


interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onLoadExample: (event: React.MouseEvent) => void,
}

class FileInput extends React.Component<FileInputProps> {
  fileInput: HTMLInputElement | null = null

  clear() {
    if(this.fileInput !== null){
      this.fileInput.value = ""
    }
  }

  render() {
    return (
      <fieldset>
        <legend>Select a savegame file</legend>
        <Row>
          <Col xs={12} md={5}><input ref={(ref) => this.fileInput = ref} type='file' id='file' accept=".cwg" onChange={this.props.onChange} /></Col>
          <Col xs={12} md={1}>or</Col>
          <Col xs={12} md={5}><Button variant="primary" onClick={this.props.onLoadExample}>Use example savegame</Button></Col>
        </Row>
        <p className="text-danger">Remember to backup your original savegame file.</p>
      </fieldset>
    )
  }
}

type MainEditorState = {
  showModal: boolean,
  modalText: string,
  validationMsg: string,
} & SavegameDefinition

class MainEditor extends React.Component<{}, MainEditorState> {
  state: MainEditorState = {
    showModal: false, modalText: '', validationMsg: '',
    ...emptySavegame()
  }
  fileInput = React.createRef<FileInput>()

  informError(error: Error) {
    let text = error.message
    if(error instanceof RangeError){
      text = 'The file is not a valid Castle of the Winds savegame.'
    }
    this.fileInput.current!.clear()
    this.setState({showModal: true, modalText: text})
  }

  closeModal() {
    this.setState({showModal: false})
  }

  savefileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      SavegameParser.parse(e.target.files[0], (state) => this.setState(state), this.informError)
    }
  }

  downloadSavefile = (e: React.MouseEvent) => {
    e.preventDefault();
    var form = document.getElementsByTagName('form')[0]
    if(form.checkValidity()){
      this.setState({validationMsg: ''})
      SavegameParser.write(this.state)
    } else {
      this.setState({validationMsg: 'All input fields should contain numbers'})
    }
  }

  handleChange = (attribute: FieldId | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
    if (attribute) {
      // @ts-ignore
      this.setState({[attribute]: event.target.value})
    }
  }

  handleSpellChange = (spell: SpellId, event: React.ChangeEvent<HTMLInputElement>) => {
    //source: 2nd comment of http://stackoverflow.com/a/18934259
    this.setState({spellBook: { ...this.state.spellBook, [spell]: event.target.value}})
  }

  isLoaded() {
    return !!this.state.level
  }

  loadExample = () => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'build/example.cwg')
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.responseType = 'arraybuffer'
    xhr.onload = () => {
      if (xhr.status === 200) {
        this.fileInput.current!.clear()
        SavegameParser.parse(xhr.response, (state: SavegameDefinition) => this.setState(state), this.informError)
      }else {
        alert('Error loading the example file. Returned status of ' + xhr.status)
      }
    }
    xhr.send()
  }

  render() {
    return (
      <Container>
        <OutdatedBrowserWarning initialShow={!browserSupported}/>
        <div className="header">
          <h1><img src={iconImage} height="32" width="32" />Castle of the Winds Editor</h1>
          <a href="https://github.com/djuretic/cotw_editor" target="_blank">View on Github</a>
        </div>
        <FileInput ref={this.fileInput} onChange={this.savefileSelected} onLoadExample={this.loadExample}/>
        {
          this.isLoaded()
          ? (
            <form className="form-horizontal">
              <Row>
                <Col xs={12} md={4}>
                  <CharacterProfile
                    str={this.state.str} int={this.state.int} con={this.state.con} dex={this.state.dex}
                    hp={this.state.hp} maxHp={this.state.maxHp}
                    mp={this.state.mp} maxMp={this.state.maxMp}
                    exp={this.state.exp} armorClass={this.state.armorClass} level={this.state.level}
                    bulk={this.state.bulk} maxBulk={this.state.maxBulk} name={this.state.name}
                    weight={this.state.weight} maxWeight={this.state.maxWeight} gender={this.state.gender}
                    handleChange={this.handleChange}
                    />
                </Col>
                <Col xs={12} md={8}>
                  <Spellbook spells={this.state.spellBook} handleChange={this.handleSpellChange}/>
                  <SpellBar bar={this.state.spellBar} />
                </Col>
              </Row>
              <fieldset>
                <legend>Download savegame file</legend>
                { this.state.validationMsg !== '' ? <Alert variant="danger">{this.state.validationMsg}</Alert> : '' }
                <Button type="submit" variant="primary" disabled={!this.isLoaded()} onClick={this.downloadSavefile}>Download savegame</Button>
              </fieldset>
              </form>
          ) : null
        }

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Error reading file: {this.state.modalText}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}

ReactDOM.render(<MainEditor />, document.getElementById('react-app'))
