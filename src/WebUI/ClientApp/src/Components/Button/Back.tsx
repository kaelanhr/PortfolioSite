import React from "react";
import { store } from "store";

export default function Back() {
	return <button className="back" onClick={(e) => store.history.goBack()}>Back</button>;
}
