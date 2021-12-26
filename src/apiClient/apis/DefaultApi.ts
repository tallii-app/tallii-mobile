/* tslint:disable */
/* eslint-disable */
/**
 * Tallii Platform
 * Platform Service for tallii.io
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: adam.aho@hey.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import {
  ErrorModel,
  ErrorModelFromJSON,
  ErrorModelToJSON,
  LoginRequestModel,
  LoginRequestModelFromJSON,
  LoginRequestModelToJSON,
  SignupRequestModel,
  SignupRequestModelFromJSON,
  SignupRequestModelToJSON,
  UserInfoModel,
  UserInfoModelFromJSON,
  UserInfoModelToJSON,
} from '../models';

export interface PostLoginRequest {
  loginRequestModel: LoginRequestModel;
}

export interface PostSignupRequest {
  signupRequestModel: SignupRequestModel;
}

/**
 *
 */
export class DefaultApi extends runtime.BaseAPI {
  /**
   * accepts an email and password and returns an access token and the user info.
   */
  async postLoginRaw(
    requestParameters: PostLoginRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<UserInfoModel>> {
    if (
      requestParameters.loginRequestModel === null ||
      requestParameters.loginRequestModel === undefined
    ) {
      throw new runtime.RequiredError(
        'loginRequestModel',
        'Required parameter requestParameters.loginRequestModel was null or undefined when calling postLogin.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/v1/login`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: LoginRequestModelToJSON(requestParameters.loginRequestModel),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, jsonValue => UserInfoModelFromJSON(jsonValue));
  }

  /**
   * accepts an email and password and returns an access token and the user info.
   */
  async postLogin(
    requestParameters: PostLoginRequest,
    initOverrides?: RequestInit,
  ): Promise<UserInfoModel> {
    const response = await this.postLoginRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * accepts an email, password and username and returns an access token and the user info.
   */
  async postSignupRaw(
    requestParameters: PostSignupRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<UserInfoModel>> {
    if (
      requestParameters.signupRequestModel === null ||
      requestParameters.signupRequestModel === undefined
    ) {
      throw new runtime.RequiredError(
        'signupRequestModel',
        'Required parameter requestParameters.signupRequestModel was null or undefined when calling postSignup.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearerAuth', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/v1/signup`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: SignupRequestModelToJSON(requestParameters.signupRequestModel),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, jsonValue => UserInfoModelFromJSON(jsonValue));
  }

  /**
   * accepts an email, password and username and returns an access token and the user info.
   */
  async postSignup(
    requestParameters: PostSignupRequest,
    initOverrides?: RequestInit,
  ): Promise<UserInfoModel> {
    const response = await this.postSignupRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
