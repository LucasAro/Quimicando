import { Controller, Get, Post, Body, Put, Param, UseGuards, Request } from '@nestjs/common';
import { MoleculeService } from './molecule.service';
import { UsersService } from '../users/users.service'; // Para acessar os dados do usuário
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Proteção com JWT


@Controller('molecule')
export class MoleculeController {
  constructor(private readonly moleculeService: MoleculeService,  private readonly usersService: UsersService,) {}

@Get('today')
@UseGuards(JwtAuthGuard)
async getMoleculeHint(@Request() req) {
  const userId = req.user.sub;
  const user = await this.usersService.findById(userId);

  const moleculeOfTheDay = await this.moleculeService.getMoleculeOfTheDay();
  if (!moleculeOfTheDay) {
    return { hints: 'Nenhuma molécula disponível no momento.' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Reseta tentativas diárias se for um novo dia
  if (!user.lastAttemptDate || user.lastAttemptDate.getTime() !== today.getTime()) {
    user.dailyAttempts = 0;
    user.lastAttemptDate = today;
    await this.usersService.saveUser(user); // Salva a data atualizada
  }

  // Retorna as dicas até o número de tentativas feitas
  const revealedHints = moleculeOfTheDay.hints.slice(0, user.dailyAttempts + 1); // +1 para incluir a primeira dica
  return {
    hints: revealedHints, // Retorna apenas as dicas já desbloqueadas
    message: user.dailyScore > 0 ? `Você já acertou a molecula de hoje e ganhou ${user.dailyScore} pontos na última tentativa.` : undefined,
  };
}


  @Post()
  createMolecule(
    @Body('name') name: string,
    @Body('formula') formula: string,
    @Body('hints') hints: string,
  ) {
    return this.moleculeService.createMolecule(name, formula, hints);
  }

  @Post('guess')
  @UseGuards(JwtAuthGuard)
  async guessMolecule(@Request() req, @Body('guess') guess: string) {
    const userId = req.user.sub;
    const user = await this.usersService.findById(userId);

    const moleculeOfTheDay = await this.moleculeService.getMoleculeOfTheDay();
    if (!moleculeOfTheDay) {
      return { success: false, message: 'Nenhuma molécula disponível.' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Reseta tentativas diárias se for um novo dia
    if (!user.lastAttemptDate || user.lastAttemptDate.getTime() !== today.getTime()) {
      user.dailyAttempts = 0;
      user.lastAttemptDate = today;
    }

    // Verifica se o palpite está correto
    if (guess.toLowerCase() === moleculeOfTheDay.name.toLowerCase()) {
      const score = Math.max(5 - user.dailyAttempts, 1); // Calcula a pontuação com base nas tentativas
      user.score += score;
      user.dailyScore = score;
      await this.usersService.saveUser(user);
      return { success: true, message: `Parabéns! Você acertou a molécula e ganhou ${score} pontos.` };
    }

    // Se errou, obtém a dica correspondente à tentativa atual (índice ajustado)
    const currentHintIndex = user.dailyAttempts + 1; // Incrementa o índice para pular a primeira dica
    const hint = moleculeOfTheDay.hints[currentHintIndex];

    // Verifica se o usuário já esgotou todas as dicas
    if (currentHintIndex >= moleculeOfTheDay.hints.length) {
      user.dailyAttempts += 1; // Incrementa para bloquear futuras tentativas hoje
      await this.usersService.saveUser(user);
      return { success: false, message: 'Você esgotou todas as tentativas hoje. Tente novamente amanhã.' };
    }

    // Incrementa as tentativas e salva
    user.dailyAttempts += 1;
    await this.usersService.saveUser(user);

    // Retorna a dica correspondente à tentativa
    return {
      success: false,
      message: 'Tente novamente!',
      hint: hint, // Envia a próxima dica com base no índice ajustado
    };
  }
  @Put(':id')
  async updateMolecule(
	@Param('id') id: string,
	@Body('hints') hints: string[],
  ) {
	return this.moleculeService.updateMolecule(id, hints);
  }



}



