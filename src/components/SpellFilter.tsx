import React from 'react'
import {Col, FormControl} from 'react-bootstrap'

interface SpellFilterProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

class SpellFilter extends React.Component<SpellFilterProps> {
	render() {
		return (
			<Col md={3}>
				Filter by name:
				<FormControl type="text" placeholder="Enter spell name here" onChange={this.props.onChange} />
			</Col>
		)
	}
})

export default SpellFilter