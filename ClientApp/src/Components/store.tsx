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
	userData: IUserData = { email: "", userName: "", userGroups: [] };

	@computed get checkUserData() {
		return this.userData;
	}

	@computed get checkLoggedIn() {
		return this.isLoggedIn;
	}

	@computed get hasBackendAccess() {
		return store.userData.userGroups.find(x => x.name == "Admin") != (null || undefined)
	}

	public history: History;

	@action setUserLogin(status: boolean) {
		this.isLoggedIn = status;
		this.GetUserInformation();
	}

	@action GetUserInformation(): IUserData {
		axios.get('/Identity/Account/me')
			.then(response => {
				console.log(response);
				if (response.status == 200) {
					const data: IUserData = response.data;
					this.userData.email = data.email;
					this.userData.userGroups = data.userGroups;
					this.userData.userName = data.userName;
					this.isLoggedIn = true;
				}
			})
			.catch(error => {
				console.log(error);
				return null
			});
		return { email: this.userData.email, userName: this.userData.userName, userGroups: this.userData.userGroups }
	}
}

export const store = new Store();
