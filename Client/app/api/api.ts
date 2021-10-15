import * as Actions from "../actions/actions";
import { ContactSearch } from "../apitypes/ts/SharedTypes.Types.ContactSearch";
import { postRequest } from "../core/requests";
import * as Types from "../types/contacts";

const GetContactsUrl = '/Api/Contacts/GetContacts';

export const fetchContacts = (search: ContactSearch): Actions.ContactAction => async dispatch => {
	dispatch(Actions.requestContacts(search.pageNumber));

	const response = await postRequest(GetContactsUrl, search);

	return response.hasError
		? dispatch(receiveError(response.error))
		: dispatch(Actions.receiveContacts(response.value));
}

export function receiveError(error: Error): Types.ReceiveServerError {
	return {
		type: Types.RECEIVE_SERVER_ERROR,
		error: error
	}
}