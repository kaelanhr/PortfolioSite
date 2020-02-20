import React, { Component } from 'react'
import { action, observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { History } from 'history';

export interface IUserState {
	isLoggedIn: boolean;
}

interface IUserData {
	email: string
	username: string
	userGroups: IGroupData[]
}

interface IGroupData {
	name: string;
}

export class Store {
	@observable
	isLoggedIn: boolean = false

	@computed get checkLoggedIn() {
		return this.isLoggedIn;
	}

	public history: History;

	@action setUserLogin(status: boolean) {
		this.isLoggedIn = status;
	}
}

export const store = new Store();
