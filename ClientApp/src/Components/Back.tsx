import React, { PureComponent } from 'react'
import { store } from './store'

export default function Back() {
	return (
		<button onClick={(e) => store.history.goBack()} >
			Back
			</button>
	)
}