import { Controller, HttpCode, Post, Body, UseInterceptors } from '@nestjs/common';
import { PromptReqBody } from './controller.types';
import { OpenAiService } from './services/openai';
import { ValidatorIntersepter } from '../../cores/intersepters/validator';
import validator from './validation.schema';

@Controller("openai")
@UseInterceptors(new ValidatorIntersepter(validator))
export class OpenAiController {
  constructor(
    private readonly openaiService: OpenAiService
  ) {}

  @HttpCode(200)
  @Post("prompt")
  async Prompt(@Body() body: PromptReqBody) {
    return this.openaiService.Prompt({
      text: body.text
    })
  }
}
