import React, { Component } from 'react'

export interface selectProps {
    name: string,
    options: any,
    onChange: any
}

export class SelectList extends Component<selectProps> {

    render() {
        return (
            <React.Fragment>
                <select name={this.props.name} onChange={this.props.onChange}>
                    {this.props.options.map((x: any) => {
                        return (
                            <option key={x.id} value={x.id}>{x.name}</option>
                        )
                    })}
                </select>
            </React.Fragment>
        )
    }
}

export default SelectList
