import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NetworkSearch } from '../data/schema/network-search';
import { NetworkSearchItem } from '../data/schema/network-search-item';
import { UserSearch } from '../data/schema/user-search';
import { MrsnvAspect } from '../data/schema/mrsnv-aspect';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * Public NDExBio API.
   * @private
   */
  private readonly ndexPublicApi = 'https://public.ndexbio.org/v2/';

  /**
   * Name of the required custom aspect
   * @private
   */
  private readonly customAspectName = 'metaRelSubNetVis';

  /**
   * Constructor
   * @param http Loading network.ts and patient data via HTTP
   */
  constructor(private http: HttpClient) {}

  /**
   * Query NDEx with a specified keyword
   * @param keyword Term that is queried
   */
  searchNdex(keyword: string): Observable<NetworkSearch> {
    const searchString = keyword.trim();

    if (searchString.length === 0) return of<NetworkSearch>();

    const url = `${this.ndexPublicApi}search/network?size=10`;
    return this.http.post<NetworkSearch>(url, { searchString });
  }

  /**
   * Loading data from NDEx by a specified UUID.
   * @param uuid identifier for the network of interest
   */
  loadNetwork(uuid: string): Observable<any[]> {
    const url = `${this.ndexPublicApi}network/${uuid}`;
    return this.http.get<any[]>(url);
  }

  /**
   * Loading a network's summary
   * @param uuid identifier for the network of interest
   */
  loadNetworkSummary(uuid: string): Observable<NetworkSearchItem> {
    const url = `${this.ndexPublicApi}network/${uuid}/summary`;
    return this.http.get<NetworkSearchItem>(url);
  }

  /**
   * Sends username and password to NDEx, returns this user's UUID, if successful, null otherwise.
   * @param username User's account name
   * @param password User's password
   */
  loginToNdex(username: string, password: string): Observable<UserSearch> {
    const url = `${this.ndexPublicApi}search/user?size=1`;
    const body: any = {
      searchString: username,
    };
    // const headers: HttpHeaders = new HttpHeaders();
    // headers.set('Authorization', this.encodeCredentials(username, password));
    const headers = new HttpHeaders({
      Authorization: this.encodeCredentials(username, password),
      'Content-Type': 'application/json',
    });
    return this.http.post<UserSearch>(url, body, { headers });
  }

  /**
   * Load a custom aspect within a network
   * @param uuid Network's UUID
   */
  loadAspectMetaRelSubNetVis(uuid: string): Observable<MrsnvAspect[]> {
    const url = `${this.ndexPublicApi}network/${uuid}/aspect/${this.customAspectName}?size=1`;
    return this.http.get<MrsnvAspect[]>(url);
  }

  /**
   * Creates a Basic Auth string from the user's name and password
   * @param username User's name
   * @param password User's password
   * @private
   */
  private encodeCredentials(username: string, password: string): string {
    const concat = `${username}:${password}`;
    return `Basic ${btoa(concat)}`;
  }

  checkNetworkRights(
    username: string,
    password: string,
    userUuid: string,
    networkId: string,
  ): Observable<any> {
    const url = `${this.ndexPublicApi}user/${userUuid}/permission?networkid=${networkId}`;
    const headers = new HttpHeaders({
      Authorization: this.encodeCredentials(username, password),
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }

  overrideNetwork(
    body: any[],
    networkUuid: string,
    username: string,
    password: string,
  ): Observable<string> {
    const url = `${this.ndexPublicApi}network/${networkUuid}`;
    const headers = new HttpHeaders({
      Authorization: this.encodeCredentials(username, password),
      'Content-Type': 'application/json',
    });
    return this.http.put(url, body, { headers, responseType: 'text' });
  }

  submitNewNetwork(body: any[], username: string, password: string): Observable<string> {
    const url = `${this.ndexPublicApi}network?visibility=PUBLIC`;
    const headers = new HttpHeaders({
      Authorization: this.encodeCredentials(username, password),
      'Content-Type': 'application/json',
    });
    return this.http.post(url, body, { headers, responseType: 'text' });
  }
}
