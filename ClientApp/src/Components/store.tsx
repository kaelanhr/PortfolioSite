import React, { Component } from 'react'
import { action, observable, computed } from 'mobx';
import axios from 'axios';
import { observer } from 'mobx-react';
import { History } from 'history';

export interface IUserState {
	isLoggedIn: boolean;
}

interface IUserData {
	email: string
	userName: string
	userGroups: IGroupData[]
}

interface IGroupData {
	name: string;
}

export class Store {
	@observable
	isLoggedIn: boolean = false

	@observable
	userData: IUserData | undefined = { email: "", userName: "", userGroups: [] };

	@computed get checkUserData() {
		return this.userData;
	}

	@computed get checkLoggedIn() {
		return this.isLoggedIn;
	}

	@computed get hasBackendAccess() {
		return store.userData?.userGroups.find(x => x.name == "Admin") != (null || undefined)
	}

	public history: History;

	@action CheckUserSession() {
		/*
		 * check if they are logged in, if they are assign
		 * all user information to the store, otherwise clear their
		 * information
		 */
		axios.get('/Identity/Account/me')
			.then(response => {
				console.log(response);
				const data: IUserData = response.data;
				if (this.userData) {
					this.userData.email = data.email;
					this.userData.userGroups = data.userGroups;
					this.userData.userName = data.userName;
				}
				this.isLoggedIn = true;
			})
			.catch(error => {
				console.log(error);
				this.userData = undefined
				this.isLoggedIn = false;
			});
	}
}

export const store = new Store();
