import { ThunkAction } from "redux-thunk";
import { GetContactsResponse } from "../apitypes/ts/SharedTypes.Types.GetContactsResponse";
import { AppState } from "../stores";
import * as Types from "../types/contacts";

export function requestContacts(pageNumber: number): Types.RequestContacts {
	return {
		type: Types.REQUEST_CONTACTS,
		pageNumber: pageNumber
	};
}

export function receiveContacts(response: any): Types.ReceiveContacts {
	const data = GetContactsResponse.fromJS(response);
	return {
		type: Types.RECEIVE_CONTACTS,
		results: data.results,
		totalResultsCount: data.totalResultCount,
		resultsPerPage: data.resultsPerPage
	};
}

export type ContactAction = ThunkAction<Promise<Types.ContactActions>, AppState, undefined, Types.ContactActions>;