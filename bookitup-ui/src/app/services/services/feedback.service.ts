/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findALlFeedbacksByBook } from '../fn/feedback/find-a-ll-feedbacks-by-book';
import { FindALlFeedbacksByBook$Params } from '../fn/feedback/find-a-ll-feedbacks-by-book';
import { PageResponseFeedbackResponse } from '../models/page-response-feedback-response';
import { saveFeedback } from '../fn/feedback/save-feedback';
import { SaveFeedback$Params } from '../fn/feedback/save-feedback';

@Injectable({ providedIn: 'root' })
export class FeedbackService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveFeedback()` */
  static readonly SaveFeedbackPath = '/feedbacks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFeedback()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedback$Response(params: SaveFeedback$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveFeedback(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFeedback$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedback(params: SaveFeedback$Params, context?: HttpContext): Observable<number> {
    return this.saveFeedback$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findALlFeedbacksByBook()` */
  static readonly FindALlFeedbacksByBookPath = '/feedbacks/book/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findALlFeedbacksByBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  findALlFeedbacksByBook$Response(params: FindALlFeedbacksByBook$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFeedbackResponse>> {
    return findALlFeedbacksByBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findALlFeedbacksByBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findALlFeedbacksByBook(params: FindALlFeedbacksByBook$Params, context?: HttpContext): Observable<PageResponseFeedbackResponse> {
    return this.findALlFeedbacksByBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFeedbackResponse>): PageResponseFeedbackResponse => r.body)
    );
  }

}
