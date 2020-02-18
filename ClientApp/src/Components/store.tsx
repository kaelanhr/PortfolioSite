import React, { Component } from 'react'
import { action, observable, computed } from 'mobx';
import { observer } from 'mobx-react';

export interface IUserState {
	isLoggedIn: boolean;
}

export class Store {
	@observable
	isLoggedIn: boolean = false

	@computed get checkLoggedIn() {
		return this.isLoggedIn;
	}

	@action setUserLogin(status: boolean) {
		this.isLoggedIn = status;
	}
}

export const store = new Store();
