import * as React from "react";
import { Form, Col, Row, Button, Table, FormControlProps } from "react-bootstrap";
import { ThunkDispatch } from "redux-thunk";
import LoadObject from "../loadObject";
import { connect } from "react-redux";
import { AppState } from "../stores";
import PageContentBox from "../components/pageContentBox";
import { ContactRecord, ContactActions } from "../types/types";
import { ContactSearch } from "../apitypes/ts/SharedTypes.Types.ContactSearch";
import * as API from "../api/api";

interface Props {
  readonly contacts: LoadObject<ReadonlyArray<ContactRecord>>;
  readonly dispatch: ThunkDispatch<AppState, undefined, ContactActions>;
  readonly pageNumber: number;
  readonly totalResultCount: number;
  readonly resultsPerPage: number;
  readonly serverError: string;
}

interface State {
  readonly searchTerm: string;
}

type EventHandler<T> = (ev: T) => void;
type TextChangedEvent = React.FormEvent<FormControlProps>;

class ContactsContainer extends React.Component<Props, State> {
  readonly _searchTermChange: EventHandler<TextChangedEvent>;
  readonly _onSearch: () => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this._searchTermChange = this.handleFieldChange('searchTerm', ev => (ev.currentTarget.value || ''));
    this._onSearch = () => this._fetchForCurrentCriteria();
  }

  componentDidMount() {
    this._fetchForCurrentCriteria();
  }

  _fetchForCurrentCriteria(pageNumber?: number) {
    const search = new ContactSearch({
      searchTerm: (this.state.searchTerm || ''),
      pageNumber: (pageNumber || 1)
    });
    this.props.dispatch(API.fetchContacts(search));
  }

  handleFieldChange<T, FieldKey extends keyof State>(fieldName: FieldKey, valuePreparer: (e: T) => State[FieldKey]) {
    return (ev: T) => {
      this.setState({ ...this.state, [fieldName]: valuePreparer(ev) });
    };
  }

  render() {
    const { serverError } = this.props;
    return (
      <PageContentBox hideTrailingMargin={true}>
        {serverError && (serverError.length > 0)
          ? <div className="alert alert-danger" role="alert">{serverError}</div>
          : undefined
        }
        <Form>
          <Row>
            <Col className="col-xs-12">
              <Form.Label htmlFor="searchTerm">What are you searching for?</Form.Label>
              <Form.Control type="text" value={this.state.searchTerm} onChange={this._searchTermChange} id="searchTerm"></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-row-reverse">
              {this.props.contacts.isLoading
                ? <Button onClick={this._onSearch} disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;&nbsp;
                            <span>Searching...</span>
                </Button>
                : <Button onClick={this._onSearch}>Find Duplicates</Button>
              }
            </Col>
          </Row>
        </Form>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Forename</th>
              <th>Surname</th>
            </tr>
          </thead>
          {this.props.contacts.hasValue && (this.props.contacts.value.length == 0)
            ? <tbody>
                <tr>
                  <td colSpan={3}>No results</td>
                </tr>
              </tbody>
            : this.renderResults(this.props.contacts)
          }
        </Table>
      </PageContentBox>
      );
  }

  renderResults(results: LoadObject<ReadonlyArray<ContactRecord>>) {
    if (!results.hasValue) {
      return null;
    }
    return (
      <tbody>
        {results.value.map(i => {
          return (
            <tr>
              <td>
                {i.title}
              </td>
              <td>
                {i.forename}
              </td>
              <td>
                {i.surname}
              </td>
            </tr>
          );
        })}
      </tbody>
      );
  }
}

const mapStateToProps = (state: AppState) => {
  const { contacts } = state;
  return {
    contacts: contacts.contacts,
    pageNumber: contacts.pageNumber,
    totalResultCount: contacts.totalResultCount,
    resultsPerPage: contacts.resultsPerPage,
    serverError: contacts.serverError
  };
};

export default connect(mapStateToProps)(ContactsContainer);