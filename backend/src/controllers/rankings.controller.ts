import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('rankings')
export class RankingsController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getGlobalRankings() {
    // Busca os usuários no banco de dados ordenados pela pontuação
    const users = await this.usersService.findAllOrderedByScore();
    return users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      score: user.score,
    }));
  }
}
