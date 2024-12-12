import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerStatsService {
  async findAll() {
    return [];
  }

  async postPlayerStats(body: any) {
    return body;
  }
}
