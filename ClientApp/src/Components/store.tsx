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
	hasBackendAccess: boolean = false

	@observable
	userData: IUserData = { email: "", userName: "", userGroups: [] };

	@computed get checkUserData() {
		return this.userData;
	}

	@computed get checkLoggedIn() {
		return this.isLoggedIn;
	}

	public history: History;

	@action CheckUserSession() {
		/*
		 * check if they are logged in, if they are assign
		 * all user information to the store, otherwise clear their
		 * information
		 */
		axios.get<IUserData>('/Identity/Account/me')
			.then(response => {
				console.log(response);
				this.userData.email = response.data.email;
				this.userData.userGroups = response.data.userGroups;
				this.userData.userName = response.data.userName;
				this.hasBackendAccess = this.userData.userGroups?.find(x => x.name == "Admin") != (null || undefined)
				this.isLoggedIn = true;
			})
			.catch(error => {
				console.log(error);
				this.userData.email = "";
				this.userData.userGroups = [];
				this.userData.userName = "";
				this.hasBackendAccess = false;
				this.isLoggedIn = false;
			});
	}
}

export const store = new Store();
