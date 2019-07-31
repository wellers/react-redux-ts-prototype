import LoadObject from "../loadObject";

type SerialisablePayload = { toJSON(): string };

export async function postRequest(
  endpoint: string,
  payload: SerialisablePayload
): Promise<LoadObject<any>> {
  const options: RequestInit = {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(payload.toJSON())
  };

  return fetch(endpoint, options)
    .then(response => {
      let error = '';
      if (!response.ok && response.status) {
        switch (response.status) {
          case 404:
            error = 'Resource not found';
            break;
          case 500:
            error = 'An error has occurred';
            break;
          default:
            error = 'An unexpected error occurred';
        }
      }
      if (error.length > 0) {
        throw error;
      }
      return response;
    })
    .then(_ => _.json().then(value => LoadObject.fromValue(value)))
    .catch(error => LoadObject.fromError(new Error(JSON.stringify(error || ''))));
}