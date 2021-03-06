import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IRequest } from '../interfaces/request';

export class Request extends Model implements IRequest {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public quantity: number;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  @ApiProperty({ type: 'string' })
  public get fullName(): string {
    return `${this.description}`.trim();
  }

  public static get tableName(): string {
    return 'Request';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    return json;
  }

  public $parseDatabaseJson(json: any): any {
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

  public $formatJson(data: IRequest): IRequest {
    return data;
  }
}
