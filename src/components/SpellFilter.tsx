import React from 'react'
import {Col, Form} from 'react-bootstrap'

interface SpellFilterProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

class SpellFilter extends React.Component<SpellFilterProps> {
	render() {
		return (
			<Col md={4}>
				Filter by name:
				<Form.Control type="text" placeholder="Enter spell name here" onChange={this.props.onChange} />
			</Col>
		)
	}
}

export default SpellFilter