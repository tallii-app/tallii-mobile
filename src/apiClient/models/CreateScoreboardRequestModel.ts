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

import {exists, mapValues} from '../runtime';
import {
  CreateScoreboardRequestModelTeams,
  CreateScoreboardRequestModelTeamsFromJSON,
  CreateScoreboardRequestModelTeamsFromJSONTyped,
  CreateScoreboardRequestModelTeamsToJSON,
} from './CreateScoreboardRequestModelTeams';

/**
 *
 * @export
 * @interface CreateScoreboardRequestModel
 */
export interface CreateScoreboardRequestModel {
  /**
   *
   * @type {string}
   * @memberof CreateScoreboardRequestModel
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof CreateScoreboardRequestModel
   */
  game: string;
  /**
   *
   * @type {CreateScoreboardRequestModelTeams}
   * @memberof CreateScoreboardRequestModel
   */
  teams: CreateScoreboardRequestModelTeams;
}

export function CreateScoreboardRequestModelFromJSON(json: any): CreateScoreboardRequestModel {
  return CreateScoreboardRequestModelFromJSONTyped(json, false);
}

export function CreateScoreboardRequestModelFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CreateScoreboardRequestModel {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json['name'],
    game: json['game'],
    teams: CreateScoreboardRequestModelTeamsFromJSON(json['teams']),
  };
}

export function CreateScoreboardRequestModelToJSON(
  value?: CreateScoreboardRequestModel | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    game: value.game,
    teams: CreateScoreboardRequestModelTeamsToJSON(value.teams),
  };
}