import * as Actions from "../actions/actions";
import * as Types from "../types/contacts";
import { ContactSearch } from "../apitypes/ts/SharedTypes.Types.ContactSearch";
import { postRequest } from "../core/requests";

const GetContactsUrl = '/Api/Contacts/GetContacts';

export const fetchContacts = (search: ContactSearch): Actions.ContactAction => async dispatch => {
  dispatch(Actions.requestContacts(search.pageNumber));
  const response = await postRequest(GetContactsUrl, search);

  if (response.hasError) {
    return dispatch(receiveError(response.error));
  }

  return dispatch(Actions.receiveContacts(response.value));
}

export function receiveError(error: Error): Types.ReceiveServerError {
  return {
    type: Types.RECEIVE_SERVER_ERROR,
    error: error
  }
}